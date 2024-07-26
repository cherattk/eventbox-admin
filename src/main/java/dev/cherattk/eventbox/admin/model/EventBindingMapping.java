package dev.cherattk.eventbox.admin.model;

import java.util.HashSet;
import java.util.Set;

public class EventBindingMapping {

	protected Integer id;
	
	protected Cloudevent event;
	
	protected Set<Listener> listeners = new HashSet<Listener>();
	
	public EventBindingMapping() {}
	
	public EventBindingMapping(Integer id, Cloudevent event, Set<Listener> listeners) {
		super();
		this.id = id;
		this.event = event;
		this.listeners = listeners;
	}

	public Cloudevent getEvent() {
		return event;
	}

	public void setEvent(Cloudevent event) {
		this.event = event;
	}

	public Set<Listener> getListeners() {
		return listeners;
	}

	public void setListener(Listener listener) {
		this.listeners.add(listener);
	}
	
	
}
