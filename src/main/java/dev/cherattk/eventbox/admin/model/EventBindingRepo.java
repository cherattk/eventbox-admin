package dev.cherattk.eventbox.admin.model;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface EventBindingRepo extends CrudRepository<EventBinding, Integer> {	
	
	public List<EventBinding> findByEventAndListener(Cloudevent event ,  Listener listener);
	
}
