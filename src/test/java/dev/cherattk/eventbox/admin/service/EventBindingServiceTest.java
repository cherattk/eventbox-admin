package dev.cherattk.eventbox.admin.service;

import static org.junit.jupiter.api.Assertions.*;

import java.net.URL;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.mockito.Mockito;

import dev.cherattk.eventbox.admin.model.Cloudevent;
import dev.cherattk.eventbox.admin.model.EventBinding;
import dev.cherattk.eventbox.admin.model.EventBindingMapping;
import dev.cherattk.eventbox.admin.model.EventBindingRepo;
import dev.cherattk.eventbox.admin.model.Listener;
import dev.cherattk.eventbox.admin.model.Thing;

@TestInstance(Lifecycle.PER_CLASS)
class EventBindingServiceTest {

	private EventBindingRepo mockEventBindingRepo;

	@BeforeEach
	public void setup() {
		mockEventBindingRepo = Mockito.mock(EventBindingRepo.class);
	}
	
	@AfterEach
	public void clear() {
		Mockito.reset(mockEventBindingRepo);
	}
	
	@Test
	void getEventBindingListenerTest() {
		
		EventBindingService eventBindingService = new EventBindingService(this.mockEventBindingRepo);
		
		List<EventBinding> mockFindAllresult = new ArrayList<EventBinding>();
		
		// binding #1
		EventBinding bindingOne = new EventBinding();
		Cloudevent eventOne = new Cloudevent(1, "1.0" , "source-1" , "event-1");
		bindingOne.setEvent(eventOne);
		Listener listenerOne = new Listener(1 , "http://localhost:3001");
		listenerOne.setThing( new Thing(1));
		bindingOne.setListener(listenerOne);
		mockFindAllresult.add(bindingOne);
		
		// binding #2
		EventBinding bindingTwo = new EventBinding();
		Cloudevent eventTwo = new Cloudevent(2, "1.0" , "source-2" , "event-2");
		bindingTwo.setEvent(eventTwo);
		Listener listenerTwo = new Listener(2 , "http://localhost:3002");
		listenerTwo.setThing( new Thing(1));
		bindingTwo.setListener(listenerTwo);
		mockFindAllresult.add(bindingTwo);
		
		// binding #3
		EventBinding bindingThree = new EventBinding();
		bindingThree.setEvent(eventTwo);
		Listener listenerThree = new Listener(3 , "http://localhost:3003");
		listenerThree.setThing( new Thing(1));
		bindingThree.setListener(listenerThree);
		mockFindAllresult.add(bindingThree);
		
		Mockito.when(mockEventBindingRepo.findAll()).thenReturn(mockFindAllresult);
		
		Collection<EventBindingMapping> result = eventBindingService.getEventBindingListener();
		
		// test that repo method is called
		Mockito.verify(mockEventBindingRepo, Mockito.times(1)).findAll();
		
		// Assert that the collection is an instance of List
	    assertTrue(result instanceof ArrayList , "fail 1");
	    
	    // expected result
	    ArrayList<EventBindingMapping> listResult = (ArrayList<EventBindingMapping>) result;
	    
	    EventBindingMapping expectedEventBindingOne = listResult.get(0);
	    
	    assertTrue(expectedEventBindingOne.getEvent().equals(eventOne) , "fail 2");
	    
	    Set<Listener> listListenerOne = expectedEventBindingOne.getListeners();
	    assertTrue(listListenerOne.contains(listenerOne) , "fail 3");
	    
	    EventBindingMapping expectedBindingTwo = listResult.get(1);
	    assertTrue(expectedBindingTwo.getEvent().equals(eventTwo) , "fail 4");
	    
	    Set<Listener> listListenerTwo = expectedBindingTwo.getListeners();
	    assertTrue(listListenerTwo.contains(listenerTwo) , "fail 5");
	    assertTrue(listListenerTwo.contains(listenerThree) , "fail 6");
	    
		
		
	}

//	@Test
//	void addEventBindingListenerTest() {
//		fail("Not yet implemented");
//	}

}
