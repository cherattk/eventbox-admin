package dev.cherattk.eventbox.admin.http;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class BindingListener {

	private Integer id;
	
	private Integer eventId;
	
	private Set<Integer> listenersId = new HashSet<Integer>();

	public BindingListener() {}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getEventId() {
		return eventId;
	}

	public void setEventId(Integer eventId) {
		this.eventId = eventId;
	}

	public Set<Integer> getListenersId() {
		return listenersId;
	}

	public void setListenersId(Set<Integer> listenersId) {
		while(listenersId.remove(null));
		this.listenersId = listenersId;
	}

	@Override
	public int hashCode() {
		return Objects.hash(eventId, id, listenersId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		BindingListener other = (BindingListener) obj;
		return Objects.equals(eventId, other.eventId) && Objects.equals(id, other.id)
				&& Objects.equals(listenersId, other.listenersId);
	}
	
	
	
	
}
