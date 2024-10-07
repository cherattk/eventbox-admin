package dev.cherattk.eventbox.admin.service;

import java.util.List;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityManager;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import dev.cherattk.eventbox.admin.http.BindingListener;
import dev.cherattk.eventbox.admin.model.Cloudevent;
import dev.cherattk.eventbox.admin.model.CloudeventRepo;
import dev.cherattk.eventbox.admin.model.EventBinding;
import dev.cherattk.eventbox.admin.model.EventBindingMapping;
import dev.cherattk.eventbox.admin.model.EventBindingRepo;
import dev.cherattk.eventbox.admin.model.Listener;
import dev.cherattk.eventbox.admin.model.ListenerRepo;
import dev.cherattk.eventbox.admin.model.Thing;
import dev.cherattk.eventbox.admin.model.ThingRepo;

@Service
public class ThingService {

	private final ThingRepo repoThing;
	private final CloudeventRepo repoCloudevent;
	private final ListenerRepo repoListener;

	ThingService(ThingRepo repoThing, CloudeventRepo repoCloudevent, ListenerRepo repoListener) {
		this.repoThing = repoThing;
		this.repoCloudevent = repoCloudevent;
		this.repoListener = repoListener;
	}

	public List<Thing> getAllThings() {
		return (List<Thing>) repoThing.findAll();
	}

	public Thing saveThing(Thing thing) {
		return repoThing.save(thing);
	}

	public boolean updateThing(Thing thing) {
		if (repoThing.existsById(thing.getId())) {
			repoThing.save(thing);
			return true;
		} else {
			return false;
		}
	}

	public boolean deleteThing(Integer thingId) {
		if (repoThing.existsById(thingId)) {
			repoThing.deleteById(thingId);
			return true;
		} else {
			return false;
		}
	}

	////////////////////////////////////////////////////////
	// Cloudevent Endpoints
	////////////////////////////////////////////////////////
	public List<Cloudevent> getAllCloudevents() {
		return (List<Cloudevent>) repoCloudevent.findAll();
	}

	public Cloudevent saveCloudevent(Cloudevent ce) {
		return repoCloudevent.save(ce);
	}

	public boolean updateCloudevent(Cloudevent ce) {
		if (repoCloudevent.existsById(ce.getId())) {
			repoCloudevent.save(ce);
			return true;
		} else {
			return false;
		}
	}

	public boolean deleteCloudevent(Integer ceId) {
		if (repoCloudevent.existsById(ceId)) {
			repoCloudevent.deleteById(ceId);
			return true;
		} else {
			return false;
		}
	}

	////////////////////////////////////////////////////////
	// Listener Endpoints
	////////////////////////////////////////////////////////
	public List<Listener> getAllListeners() {
		return (List<Listener>) repoListener.findAll();
	}

	public Listener saveListener(Listener _listener){
		return repoListener.save(_listener);
	}

	public boolean updateListener(Listener _listener) {
		if (repoListener.existsById(_listener.getId())) {
			repoListener.save(_listener);
			return true;
		} else {
			return false;
		}
	}

	public boolean deleteListener(Integer _listenerId) {
		if (repoListener.existsById(_listenerId)) {
			repoListener.deleteById(_listenerId);
			return true;
		} else {
			return false;
		}
	}

}
