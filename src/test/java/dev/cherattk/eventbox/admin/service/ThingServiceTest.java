package dev.cherattk.eventbox.admin.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;

import dev.cherattk.eventbox.admin.model.Cloudevent;
import dev.cherattk.eventbox.admin.model.CloudeventRepo;
import dev.cherattk.eventbox.admin.model.Listener;
import dev.cherattk.eventbox.admin.model.ListenerRepo;
import dev.cherattk.eventbox.admin.model.Thing;
import dev.cherattk.eventbox.admin.model.ThingRepo;

@TestInstance(Lifecycle.PER_CLASS)
class ThingServiceTest {

	private ThingRepo mockThingRepo;

	private CloudeventRepo mockCloudeventRepo;

	private ListenerRepo mockListenerRepo;

	@BeforeEach
	public void setup() {
		mockThingRepo = Mockito.mock(ThingRepo.class);
		mockCloudeventRepo = Mockito.mock(CloudeventRepo.class);
		mockListenerRepo = Mockito.mock(ListenerRepo.class);
	}
	
	@AfterEach
	public void clear() {
		Mockito.reset(mockThingRepo);
		Mockito.reset(mockCloudeventRepo);
		Mockito.reset(mockListenerRepo);
	}
	

	/**
	 * Test that ThingService.getAllThings() calls ThingRepo.findAll()
	 */
	@Test
	public void Test_getAllThings() {

		ThingService thingService = new ThingService(mockThingRepo, null, null);
		thingService.getAllThings();
		Mockito.verify(mockThingRepo, Mockito.times(1)).findAll();

	}

	/**
	 * Test that ThingService.saveThing() calls ThingRepo.save() one time
	 */
	@Test
	public void Test_saveThing() {
		Thing mockThing = new Thing();
		ThingService thingService = new ThingService(mockThingRepo, null, null);
		
		thingService.saveThing(mockThing);
		Mockito.verify(mockThingRepo, Mockito.times(1)).save(mockThing);
	}

	/**
	 * Test that ThingService.updateThing() calls ThingRepo.save() one time
	 */
	@Test
	public void Test_updateThing() {

		ThingService thingService = new ThingService(mockThingRepo, null, null);
		Integer thingId = 1;
		Thing mockThing = new Thing();
		mockThing.setId(thingId);

		// mock that thing with id thingId exists
		Mockito.when(mockThingRepo.existsById(thingId)).thenReturn(true);
		// tested method
		thingService.updateThing(mockThing);
		// assertion
		Mockito.verify(mockThingRepo, Mockito.times(1)).save(mockThing);
	}

	/**
	 * Test that ThingService.updateThing() DOES NOT call ThingRepo.save()
	 * when Thing does not exists
	 */	
	@Test
	public void Test_updateThing_Does_Nothing() {

		ThingService thingService = new ThingService(mockThingRepo, null, null);
		Integer thingId = 1;
		Thing mockThing = new Thing();
		mockThing.setId(thingId);

		// mock that thing with id thingId does not exists
		Mockito.when(mockThingRepo.existsById(thingId)).thenReturn(false);
		boolean successUpdate = thingService.updateThing(mockThing);
		// assertion
		Mockito.verify(mockThingRepo, Mockito.times(0)).save(mockThing);
		assertEquals(false, successUpdate);
	}

	/**
	 * Test that ThingService.deleteThing() calls ThingRepo.deleteById() one time
	 */
	@Test
	public void Test_deleteThing() {
		ThingService thingService = new ThingService(mockThingRepo, null, null);
		Integer thingId = 1;
		// mock that thing with id thingId exists
		Mockito.when(mockThingRepo.existsById(thingId)).thenReturn(true);
		boolean successUpdate = thingService.deleteThing(thingId);
		// assertion
		Mockito.verify(mockThingRepo, Mockito.times(1)).deleteById(thingId);
		assertEquals(true, successUpdate);
	}

	/**
	 * Test that ThingService.getAllCloudevents() calls CloudeventRepo.findAll() one time
	 */
	@Test
	public void Test_getAllCloudevents() {
		ThingService thingService = new ThingService(null, mockCloudeventRepo, null);
		thingService.getAllCloudevents();
		Mockito.verify(mockCloudeventRepo, Mockito.times(1)).findAll();
	}

	/**
	 * Test that ThingService.saveCloudevent() calls CloudeventRepo.save() one time
	 */
	@Test
	public void Test_saveCloudevent() {
		Cloudevent mockEvent = new Cloudevent(1);
		ThingService thingService = new ThingService(null, mockCloudeventRepo, null);
		
		thingService.saveCloudevent(mockEvent);
		Mockito.verify(mockCloudeventRepo, Mockito.times(1)).save(mockEvent);
	}

	/**
	 * Test that ThingService.updateCloudevent() calls CloudeventRepo.save() one time
	 */
	@Test
	public void Test_updateCloudevent() {
		
		ThingService thingService = new ThingService(null, mockCloudeventRepo , null);
		Integer ceId = 1;
		Cloudevent mockCloudevent = new Cloudevent();
		mockCloudevent.setId(ceId);

		// mock that cloudvent with id ceId exists
		Mockito.when(mockCloudeventRepo.existsById(ceId)).thenReturn(true);
		thingService.updateCloudevent(mockCloudevent);
		// assertion
		Mockito.verify(mockCloudeventRepo, Mockito.times(1)).save(mockCloudevent);
	}
	
	/**
	 * Test that ThingService.updateCloudevent() DOES NOT Call CloudeventRepo.save()
	 * when the cloudevent does not exists
	 */
	@Test
	public void Test_updateCloudevent_Does_Nothing() {
		
		ThingService thingService = new ThingService(null, mockCloudeventRepo , null);
		Integer ceId = 1;
		Cloudevent mockCloudevent = new Cloudevent();
		mockCloudevent.setId(ceId);

		// mock that cloudevent with id ceId does not exist
		Mockito.when(mockCloudeventRepo.existsById(ceId)).thenReturn(false);
		boolean successUpdate = thingService.updateCloudevent(mockCloudevent);
		// assertion
		Mockito.verify(mockCloudeventRepo, Mockito.times(0)).save(mockCloudevent);
		assertEquals(false, successUpdate);
	}

	/**
	 * Test that ThingService.deleteCloudevent() calls CloudeventRepo.deleteById() one time
	 */
	@Test
	public void Test_deleteCloudevent() {
		
		ThingService thingService = new ThingService(null, mockCloudeventRepo , null);
		Integer ceId = 1;
		Cloudevent mockCloudevent = new Cloudevent();
		mockCloudevent.setId(ceId);

		// mock that cloudevent with id ceId exists
		Mockito.when(mockCloudeventRepo.existsById(ceId)).thenReturn(true);
		boolean successUpdate = thingService.deleteCloudevent(ceId);
		// assertion
		Mockito.verify(mockCloudeventRepo, Mockito.times(1)).deleteById(ceId);
		assertEquals(true, successUpdate);
	}

	@Test
	public void Test_getAllListeners() {
		ThingService thingService = new ThingService(null, null, mockListenerRepo);
		thingService.getAllListeners();
		Mockito.verify(mockListenerRepo, Mockito.times(1)).findAll();
	}

	/**
	 * Test that ThingService.saveListener() calls ListenerRepo.save() one time
	 */
	@Test
	public void Test_saveListener() {
		
		Listener mockListener = new Listener(1);
		ThingService thingService = new ThingService(null, null, mockListenerRepo);
		
		thingService.saveListener(mockListener);
		Mockito.verify(mockListenerRepo, Mockito.times(1)).save(mockListener);
	}


	/**
	 * Test that ThingService.updateListener() calls ListenerRepo.save() one time
	 */
	@Test
	public void Test_updateListener() {
		ThingService thingService = new ThingService(null, null, mockListenerRepo);
		Integer listenerId = 1;
		Listener mockListener = new Listener();
		mockListener.setId(1);

		// mock that listener with id thingId exists
		Mockito.when(mockListenerRepo.existsById(listenerId)).thenReturn(true);
		// tested method
		boolean successUpdate = thingService.updateListener(mockListener);
		// assertion
		Mockito.verify(mockListenerRepo, Mockito.times(1)).save(mockListener);
		assertEquals(true, successUpdate);
	}
	
	/**
	 * Test that ThingService.updateListener() DOES NOT call ListenerRepo.save()
	 *  when listener does not exists
	 */
	@Test
	public void Test_updateListener_DOES_NOTHING() {
		ThingService thingService = new ThingService(null, null, mockListenerRepo);
		Integer listenerId = 1;
		Listener mockListener = new Listener();
		mockListener.setId(1);

		// mock that listener with id thingId exists
		Mockito.when(mockListenerRepo.existsById(listenerId)).thenReturn(false);
		// tested method
		boolean successUpdate = thingService.updateListener(mockListener);
		// assertion
		Mockito.verify(mockListenerRepo, Mockito.times(0)).save(mockListener);
		assertEquals(false, successUpdate);
	}

	/**
	 * Test that ThingService.deleteListener() calls ListenerRepo.deleteById() one time
	 */
	@Test
	public void Test_deleteListener() {
		
		ThingService thingService = new ThingService(null, null, mockListenerRepo);
		Integer listenerId = 1;
		// mock that listener with id thingId exists
		Mockito.when(mockListenerRepo.existsById(listenerId)).thenReturn(true);
		// tested method
		thingService.deleteListener(listenerId);
		// assertion
		Mockito.verify(mockListenerRepo, Mockito.times(1)).deleteById(listenerId);
	}

}
