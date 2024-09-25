package dev.cherattk.eventbox.admin;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.cherattk.eventbox.admin.model.Cloudevent;
import dev.cherattk.eventbox.admin.model.EventBindingMapping;
import dev.cherattk.eventbox.admin.model.Listener;
import dev.cherattk.eventbox.admin.model.Thing;
import dev.cherattk.eventbox.admin.service.EventBindingService;
import dev.cherattk.eventbox.admin.service.ThingService;
import dev.cherattk.eventbox.admin.http.BindingListener;
import dev.cherattk.eventbox.admin.http.Response;

@RestController
@RequestMapping("/api")
public class APIController {

	@Autowired
	private ThingService thingService;

	@Autowired
	private EventBindingService eventBindingService;

	public APIController(ThingService thingService, EventBindingService eventBindingService) {
		this.thingService = thingService;
		this.eventBindingService = eventBindingService;
	}

	////////////////////////////////////////////////////////
	// EventBinding
	////////////////////////////////////////////////////
	@GetMapping("/eventbinding")
	public Collection<EventBindingMapping> getAllEventBinding() {
		// TODO authenticate broker before sending response
		return eventBindingService.getEventBindingListener();
	}

	@PostMapping("/eventbinding")
	public ResponseEntity<String> bindListener(@RequestBody BindingListener reqBody) {
		try {
			int savedSize = eventBindingService.addEventBindingListener(reqBody);
			if (savedSize > 0) {
				return ResponseEntity.ok().body(Response.success());
			} else {
				return ResponseEntity.badRequest().body("error 1");
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body("error 2");
		}
	}
	
	@DeleteMapping("/eventbinding/{event_id}/{listener_id}")
	public ResponseEntity<String> removeEventBindingListener(
			@PathVariable("event_id") int eventId,
			@PathVariable("listener_id") int listenerId)
	{
		if (eventBindingService.deleteEventBinding(eventId , listenerId)) {
			return ResponseEntity.ok().body(Response.success());
		} else {
			return ResponseEntity.badRequest().body("error");
		}
	}

	////////////////////////////////////////////////////////
	// Thing
	////////////////////////////////////////////////////
	@GetMapping("/things")
	public List<Thing> getAllThings() {
		return thingService.getAllThings();
	}

	/*
	 * @PostMapping("/things") Thing addThing(@RequestBody Thing _thing) { return
	 * repoThing.save(_thing); }
	 */

	@PostMapping("/things")
	public Thing addThing(@RequestBody Thing thing) {
		return thingService.saveThing(thing);
	}

	@PutMapping("/things/{thing_id}")
	public ResponseEntity<String> updateThing(@PathVariable("thing_id") int thingId, @RequestBody Thing thing) {
		if (thingId == thing.getId()) {
			if (thingService.updateThing(thing)) {
				return ResponseEntity.ok().body(Response.success());
			};
			return ResponseEntity.badRequest().body("error");
		} else {
			return ResponseEntity.badRequest().body("error");
		}
	}

	@DeleteMapping("/things/{thing_id}")
	public ResponseEntity<String> removeThing(@PathVariable("thing_id") int thingId) {
		if (thingService.deleteThing(thingId)) {
			return ResponseEntity.ok().body(Response.success());
		} else {
			return ResponseEntity.badRequest().body("error");
		}
	}

	////////////////////////////////////////////////////////
	// CloudEvents
	////////////////////////////////////////////////////////
	@GetMapping("/cloudevents")
	public List<Cloudevent> getAllCloudevents() {
		return this.thingService.getAllCloudevents();
	}

	@PostMapping("/cloudevents")
	public Cloudevent addCloudevent(@Validated(Cloudevent.class) @RequestBody Cloudevent newCloudevent) {
		return thingService.saveCloudevent(newCloudevent);
	}

	@PutMapping("/cloudevents/{event_id}")
	public ResponseEntity<String> updateCloudevent(
			@PathVariable("event_id") int eventId,
			@RequestBody Cloudevent freshEvent
	) {
		if (eventId == freshEvent.getId()) {
			if (thingService.updateCloudevent(freshEvent)) {
				return ResponseEntity.ok().body(Response.success());
			};
			return ResponseEntity.badRequest().body("error");
		} else {
			return ResponseEntity.badRequest().body("error");
		}
	}

	@DeleteMapping("/cloudevents/{event_id}")
	public ResponseEntity<String> removeCloudevent(@PathVariable("event_id") int eventId) {
		if (thingService.deleteCloudevent(eventId)) {
			return ResponseEntity.ok().body(Response.success());
		} else {
			return ResponseEntity.badRequest().body("error");
		}
	}

	////////////////////////////////////////////////////////
	// Listener Endpoints
	////////////////////////////////////////////////////////
	@GetMapping("/listeners")
	public List<Listener> getAllListeners() {
		return (List<Listener>) this.thingService.getAllListeners();
	}

	@PostMapping("/listeners")
	public Listener addListener(@RequestBody Listener newListener) {
		return thingService.saveListener(newListener);
	}

	@PutMapping("/listeners/{listener_id}")
	public ResponseEntity<String> updateListener(
			@PathVariable("listener_id") int listenerId, 
			@RequestBody Listener freshListener) {
		
		if (listenerId == freshListener.getId()) {
			if (thingService.updateListener(freshListener)) {
				return ResponseEntity.ok().body(Response.success());
			};
			return ResponseEntity.badRequest().body("error");
		} else {
			return ResponseEntity.badRequest().body("error");
		}
	}

	@DeleteMapping("/listeners/{listener_id}")
	public ResponseEntity<String> removeListener(@PathVariable("listener_id") int listenerId) {
		if (thingService.deleteListener(listenerId)) {
			return ResponseEntity.ok().body(Response.success());
		} else {
			return ResponseEntity.badRequest().body("error");
		}
	}

}
