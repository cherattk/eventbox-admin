package dev.cherattk.eventbox.admin;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import org.assertj.core.util.Arrays;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.databind.ObjectMapper;

import dev.cherattk.eventbox.admin.http.BindingListener;
import dev.cherattk.eventbox.admin.http.Response;
import dev.cherattk.eventbox.admin.model.Cloudevent;
import dev.cherattk.eventbox.admin.model.EventBindingMapping;
import dev.cherattk.eventbox.admin.model.Listener;
import dev.cherattk.eventbox.admin.model.Thing;
import dev.cherattk.eventbox.admin.service.EventBindingService;
import dev.cherattk.eventbox.admin.service.ThingService;

@WebMvcTest(APIController.class)
class APIControllerTest {

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private ThingService mockThingService;

	@MockBean
	private EventBindingService mockEventBindingService;
	
	@Test
	@DisplayName("Test GET \"/api/things\"")
	public void getAllThingsTest() throws Exception {

		String testedURL = "/api/things";

		List<Thing> listThing = new ArrayList<Thing>();
		listThing.add(new Thing(1));
		listThing.add(new Thing(2));
		listThing.add(new Thing(3));

		when(mockThingService.getAllThings()).thenReturn(listThing);
		
		ResultActions resultActions = this.mockMvc.perform(MockMvcRequestBuilders.get(testedURL));
		
		resultActions.andExpect(MockMvcResultMatchers.status().isOk());	
		String expectedJsonArray = objectMapper.writeValueAsString(listThing);
		resultActions.andExpect(MockMvcResultMatchers.content().string(expectedJsonArray));
		// assertion
		//assertEquals(resultActions.andReturn().getResponse().getContentAsString(), expectedJsonArray);
	}

	@Test
	@DisplayName("Test POST \"/api/things\"")
	public void addThingTest() throws Exception {

		String testedURL = "/api/things";
		Thing reqBody = new Thing(1);
		String mockJsonPayload = objectMapper.writeValueAsString(reqBody);

		MockHttpServletRequestBuilder postRequest = MockMvcRequestBuilders.post(testedURL)
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(mockJsonPayload);

		when(mockThingService.saveThing(reqBody)).thenReturn(reqBody);

		ResultActions resultActions = this.mockMvc.perform(postRequest);
		// assertion
		resultActions.andExpect(MockMvcResultMatchers.status().isOk());
		resultActions.andExpect(MockMvcResultMatchers.jsonPath("$.id", Matchers.is(reqBody.getId())));
		resultActions.andExpect(MockMvcResultMatchers.jsonPath("$.name", Matchers.is(reqBody.getName())));
		resultActions.andExpect(MockMvcResultMatchers.jsonPath("$.description", Matchers.is(reqBody.getDescription())));
		
		String expectedCategoryValue = Thing.ThingCategory.WEB_SERVICE.name(); // default value
		resultActions.andExpect(MockMvcResultMatchers.jsonPath("$.category", Matchers.is(expectedCategoryValue)));
	}

	@Test
	@DisplayName("Test PUT \"/api/things/{thing_id}\"")
	public void updateThingTest() throws Exception {

		String testedURL = "/api/things/{thing_id}";
		Thing reqBody = new Thing(1);
		String mockJsonPayload = objectMapper.writeValueAsString(reqBody);
		Integer thingId = 1;

		MockHttpServletRequestBuilder putRequest = MockMvcRequestBuilders.put(testedURL, thingId)
				.accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON).content(mockJsonPayload);

		when(mockThingService.updateThing(reqBody)).thenReturn(true);

		ResultActions resultActions = this.mockMvc.perform(putRequest);
		resultActions.andExpect(MockMvcResultMatchers.status().isOk());		
		String expectedResponse = dev.cherattk.eventbox.admin.http.Response.success();
		resultActions.andExpect(MockMvcResultMatchers.content().string(Matchers.is(expectedResponse)));
	}

	@Test
	@DisplayName("Test DELETE \"/api/things/{thing_id}\"")
	public void removeThingTest() throws Exception {

		String testedURL = "/api/things/{thing_id}";
		Integer thingId = 1;

		MockHttpServletRequestBuilder deleteRequest = MockMvcRequestBuilders.delete(testedURL, thingId);

		when(mockThingService.deleteThing(thingId)).thenReturn(true);

		ResultActions resultActions = this.mockMvc.perform(deleteRequest);
		resultActions.andExpect(MockMvcResultMatchers.status().isOk());
		String expectedResponse = dev.cherattk.eventbox.admin.http.Response.success();
		resultActions.andExpect(MockMvcResultMatchers.content().string(Matchers.is(expectedResponse)));
	}

	/////////////////////////////////////////////////
	// Test Cloudevents API Method
	/////////////////////////////////////////////////
	/*
	 * @Test
	 * 
	 * @DisplayName("Test GET \"/api/cloudevents\"") public void
	 * getAllCloudeventsTest() throws Exception {
	 * 
	 * String testedURL = "/api/cloudevents"; List<Object[]> listCE = List.of(new
	 * Cloudevent(1), new Cloudevent(2), new Cloudevent(3)); String
	 * expectedJsonArray = objectMapper.writeValueAsString(listCE);
	 * 
	 * when(mockThingService.getAllCloudevents()).thenReturn(listCE); ResultActions
	 * resultActions = this.mockMvc.perform(MockMvcRequestBuilders.get(testedURL));
	 * 
	 * resultActions.andExpect(MockMvcResultMatchers.status().isOk());
	 * resultActions.andExpect(MockMvcResultMatchers.content().string(Matchers.is(
	 * expectedJsonArray))); // assertion //assertEquals(expectedJsonArray,
	 * resultActions.andReturn().getResponse().getContentAsString()); }
	 */

	@Test
	@DisplayName("Test POST \"/api/cloudevents\"")
	public void addCloudeventTest() throws Exception {

		String testedURL = "/api/cloudevents";
		Cloudevent reqBody = new Cloudevent(1);
		String mockJsonPayload = objectMapper.writeValueAsString(reqBody);

		MockHttpServletRequestBuilder postRequest = MockMvcRequestBuilders.post(testedURL)
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(mockJsonPayload);
		
		Cloudevent savedCloudevent = reqBody;
		savedCloudevent.setId(111); // mock the newly created id by CrudRepository
		
		when(mockThingService.saveCloudevent(reqBody)).thenReturn(savedCloudevent);
		
		ResultActions resultActions = this.mockMvc.perform(postRequest);
		resultActions.andExpect(MockMvcResultMatchers.status().isOk());
		
		String savedCloudeventAsJSON = objectMapper.writeValueAsString(savedCloudevent);
		resultActions.andExpect(MockMvcResultMatchers.content().string(Matchers.is(savedCloudeventAsJSON)));
	}
	
	@Test
	@DisplayName("Test PUT \"/api/cloudevents\"")
	public void updateCloudeventTest() throws Exception {

		String testedURL = "/api/cloudevents/{event_id}";
		Cloudevent reqBody = new Cloudevent(1);
		Integer eventId = 1;

		String mockJsonPayload = objectMapper.writeValueAsString(reqBody);
		MockHttpServletRequestBuilder putRequest = MockMvcRequestBuilders.put(testedURL, eventId)
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(mockJsonPayload);

		when(mockThingService.updateCloudevent(reqBody)).thenReturn(true);
		
		ResultActions resultActions = this.mockMvc.perform(putRequest);
		resultActions.andExpect(MockMvcResultMatchers.status().isOk());
		resultActions.andExpect(MockMvcResultMatchers.jsonPath("$.response", Matchers.is("success")));

	}

	@Test
	@DisplayName("Test DELETE \"/api/cloudevents\"")
	public void removeCloudeventTest() throws Exception {

		String testedURL = "/api/cloudevents/{event_id}";
		Integer eventId = 1;

		MockHttpServletRequestBuilder deleteRequest = MockMvcRequestBuilders.delete(testedURL, eventId);

		when(mockThingService.deleteCloudevent(eventId)).thenReturn(true);
		ResultActions resultActions = this.mockMvc.perform(deleteRequest);
		resultActions.andExpect(MockMvcResultMatchers.status().isOk());
		
		String expectedResponseBody = dev.cherattk.eventbox.admin.http.Response.success();
		resultActions.andExpect(MockMvcResultMatchers.content().string(Matchers.is(expectedResponseBody)));

	}

	@Test
	@DisplayName("Test GET \"/api/listeners\"")
	public void getAllListenersTest() throws Exception {

		String testedURL = "/api/listeners";

		List<Listener> mockListListener = new ArrayList<Listener>();
		mockListListener.add(new Listener(1));
		mockListListener.add(new Listener(2));
		mockListListener.add(new Listener(3));
		
		when(mockThingService.getAllListeners()).thenReturn(mockListListener);

		ResultActions resultActions = this.mockMvc.perform(MockMvcRequestBuilders.get(testedURL));
		resultActions.andExpect(MockMvcResultMatchers.status().isOk());

		String expectedJsonArray = objectMapper.writeValueAsString(mockListListener);
		// assertion
		assertEquals(expectedJsonArray , 
				resultActions.andReturn().getResponse().getContentAsString());
	}

	@Test
	@DisplayName("Test POST \"/api/listeners\"")
	public void addListenerTest() throws Exception {

		String testedURL = "/api/listeners";
		Listener reqBody = new Listener(1);
		String mockJsonPayload = objectMapper.writeValueAsString(reqBody);

		MockHttpServletRequestBuilder postRequest = MockMvcRequestBuilders.post(testedURL)
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(mockJsonPayload);

		when(mockThingService.saveListener(reqBody)).thenReturn(reqBody);

		ResultActions resultActions = this.mockMvc.perform(postRequest);
		// assertion
		resultActions.andExpect(MockMvcResultMatchers.status().isOk());
		resultActions.andExpect(MockMvcResultMatchers.jsonPath("$.id", Matchers.is(reqBody.getId())));
		resultActions.andExpect(MockMvcResultMatchers.jsonPath("$.endpoint", Matchers.is(reqBody.getEndpoint())));
		resultActions.andExpect(MockMvcResultMatchers.jsonPath("$.protocol", Matchers.is(reqBody.getProtocol())));
	}

	@Test
	@DisplayName("Test PUT \"/api/listeners/{listener_id}\"")
	public void updateListenerTest() throws Exception {

		String testedURL = "/api/listeners/{listener_id}";
		Listener reqBody = new Listener(1);
		Integer listenerId = 1;
		String mockJsonPayload = objectMapper.writeValueAsString(reqBody);
		
		MockHttpServletRequestBuilder putRequest = MockMvcRequestBuilders.put(testedURL , listenerId)
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(mockJsonPayload);

		when(mockThingService.updateListener(reqBody)).thenReturn(true);

		ResultActions resultActions = this.mockMvc.perform(putRequest);
		resultActions.andExpect(MockMvcResultMatchers.status().isOk());
		resultActions.andExpect(MockMvcResultMatchers.jsonPath("$.response", Matchers.is("success")));
	}

	@Test
	@DisplayName("Test DELETE \"/api/listeners/{listener_id}\"")
	public void removeListenerTest() throws Exception {

		String testedURL = "/api/listeners/{listener_id}";
		Integer listenerId = 1;

		MockHttpServletRequestBuilder deleteRequest = MockMvcRequestBuilders.delete(testedURL, listenerId);

		when(mockThingService.deleteListener(listenerId)).thenReturn(true);

		ResultActions resultActions = this.mockMvc.perform(deleteRequest);
		resultActions.andExpect(MockMvcResultMatchers.status().isOk());
		String successResBody = dev.cherattk.eventbox.admin.http.Response.success();
		resultActions.andExpect(MockMvcResultMatchers.content().string(Matchers.is(successResBody)));
	}

	@Test
	@DisplayName("Test GET \"/api/eventbinding\"")
	public void getAllEventBindingTest() throws Exception {

		String testedURL = "/api/eventbinding";
		Map<String, EventBindingMapping> mockResult = new HashMap<String, EventBindingMapping>();
		EventBindingMapping binding_1 = new EventBindingMapping(1, new Cloudevent(), new HashSet<Listener>());
		mockResult.put("key-1", binding_1);

		Collection<EventBindingMapping> expectedResult = mockResult.values();
		String expectedJsonRespBody = objectMapper.writeValueAsString(expectedResult);

		when(mockEventBindingService.getEventBindingListener()).thenReturn(expectedResult);
		ResultActions resultActions = this.mockMvc.perform(MockMvcRequestBuilders.get(testedURL));

		// assertion
		assertEquals(expectedJsonRespBody ,
				resultActions.andReturn().getResponse().getContentAsString());
	}
	
	@Test
	@DisplayName("Test POST \"/api/eventbinding\"")
	public void bindListenerTest() throws Exception {

		String testedURL = "/api/eventbinding";
		
		BindingListener bindingListener = new BindingListener();
		String mockRequestBody = objectMapper.writeValueAsString(bindingListener);
		
		when(mockEventBindingService.addEventBindingListener(bindingListener)).thenReturn(3);
		
		MockHttpServletRequestBuilder postRequest = MockMvcRequestBuilders.post(testedURL)
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(mockRequestBody);

		ResultActions resultActions = this.mockMvc.perform(postRequest);
		resultActions.andExpect(MockMvcResultMatchers.status().isOk());
		
		String successResponseBody = dev.cherattk.eventbox.admin.http.Response.success();
		resultActions.andExpect(MockMvcResultMatchers.content().string(Matchers.is(successResponseBody)));
	}

}
