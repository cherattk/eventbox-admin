package dev.cherattk.eventbox.admin;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

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
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.databind.ObjectMapper;

import dev.cherattk.eventbox.admin.http.BindingListener;
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

		List<Thing> mockListThing = List.of(new Thing(1), new Thing(2), new Thing(3));

		when(mockThingService.getAllThings()).thenReturn(mockListThing);

		ResultActions resultActions = this.mockMvc.perform(MockMvcRequestBuilders.get(testedURL));
		resultActions.andExpect(MockMvcResultMatchers.status().isOk());

		String expectedJsonArray = objectMapper.writeValueAsString(mockListThing);
		// assertion
		assertEquals(resultActions.andReturn().getResponse().getContentAsString()
		, expectedJsonArray);
	}

	@Test
	@DisplayName("Test POST \"/api/things\"")
	public void addThingTest() throws Exception {

		String testedURL = "/api/things";
		Thing mockReqBody = new Thing(1);
		String mockJsonPayload = objectMapper.writeValueAsString(mockReqBody);

		MockHttpServletRequestBuilder postRequest = MockMvcRequestBuilders.post(testedURL)
				.accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON).content(mockJsonPayload);

		when(mockThingService.saveThing(mockReqBody)).thenReturn(mockReqBody);

		ResultActions resultActions = this.mockMvc.perform(postRequest);
		// assertion
		resultActions.andExpect(MockMvcResultMatchers.status().isOk());
		resultActions.andExpect(MockMvcResultMatchers.jsonPath("$.id", Matchers.is(mockReqBody.getId())));
		resultActions.andExpect(MockMvcResultMatchers.jsonPath("$.name", Matchers.is(mockReqBody.getName())));
		resultActions
				.andExpect(MockMvcResultMatchers.jsonPath("$.description", Matchers.is(mockReqBody.getDescription())));
		String expectedCategoryValue = Thing.ThingCategory.WEB_SERVICE.name();
		resultActions.andExpect(MockMvcResultMatchers.jsonPath("$.category", Matchers.is(expectedCategoryValue)));
	}

	@Test
	@DisplayName("Test PUT \"/api/things/{thing_id}\"")
	public void updateThingTest() throws Exception {

		String testedURL = "/api/things/{thing_id}";
		Thing mockReqBody = new Thing(1);
		String mockJsonPayload = objectMapper.writeValueAsString(mockReqBody);
		Integer thingId = 1;

		MockHttpServletRequestBuilder putRequest = MockMvcRequestBuilders.put(testedURL, thingId)
				.accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON).content(mockJsonPayload);

		when(mockThingService.updateThing(mockReqBody)).thenReturn(true);

		ResultActions resultActions = this.mockMvc.perform(putRequest);
		resultActions.andExpect(MockMvcResultMatchers.status().isOk());
		resultActions.andExpect(MockMvcResultMatchers.content().string(Matchers.is("success")));
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
		resultActions.andExpect(MockMvcResultMatchers.content().string(Matchers.is("success")));
	}

	/////////////////////////////////////////////////
	// Test Cloudevents API Method
	///////////////////////////////////////////////////
	@Test
	@DisplayName("Test GET \"/api/cloudevents\"")
	public void getAllCloudeventsTest() throws Exception {

		String testedURL = "/api/cloudevents";
		List<Cloudevent> mockList = List.of(new Cloudevent(1), new Cloudevent(2), new Cloudevent(3));
		String expectedJsonArray = objectMapper.writeValueAsString(mockList);

		when(mockThingService.getAllCloudevents()).thenReturn(mockList);
		ResultActions resultActions = this.mockMvc.perform(MockMvcRequestBuilders.get(testedURL));
		resultActions.andExpect(MockMvcResultMatchers.status().isOk());

		// assertion
		assertEquals(expectedJsonArray , 
				resultActions.andReturn().getResponse().getContentAsString());
	}

	@Test
	@DisplayName("Test POST \"/api/cloudevents\"")
	public void addCloudeventTest() throws Exception {

		String testedURL = "/api/cloudevents";
		Cloudevent mockReqBody = new Cloudevent(1);
		String mockJsonPayload = objectMapper.writeValueAsString(mockReqBody);

		MockHttpServletRequestBuilder postRequest = MockMvcRequestBuilders.post(testedURL)
				.accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON).content(mockJsonPayload);

		when(mockThingService.saveCloudevent(mockReqBody)).thenReturn(mockReqBody);
		this.mockMvc.perform(postRequest).andExpect(MockMvcResultMatchers.status().isOk());
	}

	@Test
	@DisplayName("Test PUT \"/api/cloudevents\"")
	public void updateCloudeventTest() throws Exception {

		String testedURL = "/api/cloudevents/{event_id}";
		Cloudevent mockReqBody = new Cloudevent(1);
		Integer eventId = 1;

		String mockJsonPayload = objectMapper.writeValueAsString(mockReqBody);
		MockHttpServletRequestBuilder putRequest = MockMvcRequestBuilders.put(testedURL, eventId)
				.accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON).content(mockJsonPayload);

		when(mockThingService.updateCloudevent(mockReqBody)).thenReturn(true);
		this.mockMvc.perform(putRequest).andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().string(Matchers.is("success")));

	}

	@Test
	@DisplayName("Test DELETE \"/api/cloudevents\"")
	public void removeCloudeventTest() throws Exception {

		String testedURL = "/api/cloudevents/{event_id}";
		Integer eventId = 1;

		MockHttpServletRequestBuilder deleteRequest = MockMvcRequestBuilders.delete(testedURL, eventId);

		when(mockThingService.deleteCloudevent(eventId)).thenReturn(true);
		this.mockMvc.perform(deleteRequest).andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().string(Matchers.is("success")));

	}

	@Test
	@DisplayName("Test GET \"/api/listeners\"")
	public void getAllListenersTest() throws Exception {

		String testedURL = "/api/listeners";

		List<Listener> mockListListener = List.of(new Listener(1), new Listener(2), new Listener(3));

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
		Listener mockReqBody = new Listener(1);
		mockReqBody.setThingId(1);
		String mockJsonPayload = objectMapper.writeValueAsString(mockReqBody);

		MockHttpServletRequestBuilder postRequest = MockMvcRequestBuilders.post(testedURL)
				.accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON).content(mockJsonPayload);

		when(mockThingService.saveListener(mockReqBody)).thenReturn(mockReqBody);

		ResultActions resultActions = this.mockMvc.perform(postRequest);
		// assertion
		resultActions.andExpect(MockMvcResultMatchers.status().isOk());
		resultActions.andExpect(MockMvcResultMatchers.jsonPath("$.id", Matchers.is(mockReqBody.getId())));
		resultActions.andExpect(MockMvcResultMatchers.jsonPath("$.name", Matchers.is(mockReqBody.getName())));
		resultActions.andExpect(MockMvcResultMatchers.jsonPath("$.name", Matchers.is(mockReqBody.getUrl())));
	}

	@Test
	@DisplayName("Test PUT \"/api/listeners/{listener_id}\"")
	public void updateListenerTest() throws Exception {

		String testedURL = "/api/listeners/{listener_id}";
		Listener mockReqBody = new Listener(1);
		String mockJsonPayload = objectMapper.writeValueAsString(mockReqBody);
		Integer thingId = 1;

		MockHttpServletRequestBuilder putRequest = MockMvcRequestBuilders.put(testedURL, thingId)
				.accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON).content(mockJsonPayload);

		when(mockThingService.updateListener(mockReqBody)).thenReturn(true);

		ResultActions resultActions = this.mockMvc.perform(putRequest);
		resultActions.andExpect(MockMvcResultMatchers.status().isOk());
		resultActions.andExpect(MockMvcResultMatchers.content().string(Matchers.is("success")));
	}

	@Test
	@DisplayName("Test DELETE \"/api/listeners/{listener_id}\"")
	public void removeListenerTest() throws Exception {

		String testedURL = "/api/listeners/{listener_id}";
		Integer thingId = 1;

		MockHttpServletRequestBuilder deleteRequest = MockMvcRequestBuilders.delete(testedURL, thingId);

		when(mockThingService.deleteListener(thingId)).thenReturn(true);

		ResultActions resultActions = this.mockMvc.perform(deleteRequest);
		resultActions.andExpect(MockMvcResultMatchers.status().isOk());
		resultActions.andExpect(MockMvcResultMatchers.content().string(Matchers.is("success")));
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
		resultActions.andExpect(MockMvcResultMatchers.content().string(Matchers.is("success")));
	}

}
