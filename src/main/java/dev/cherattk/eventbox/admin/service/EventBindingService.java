package dev.cherattk.eventbox.admin.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Service;

import dev.cherattk.eventbox.admin.http.BindingListener;
import dev.cherattk.eventbox.admin.model.Cloudevent;
import dev.cherattk.eventbox.admin.model.CloudeventRepo;
import dev.cherattk.eventbox.admin.model.EventBinding;
import dev.cherattk.eventbox.admin.model.EventBindingMapping;
import dev.cherattk.eventbox.admin.model.EventBindingRepo;
import dev.cherattk.eventbox.admin.model.Listener;
import dev.cherattk.eventbox.admin.model.ListenerRepo;
import dev.cherattk.eventbox.admin.model.ThingRepo;

@Service
public class EventBindingService {

	private final EventBindingRepo repoEventBinding;
	
	EventBindingService(EventBindingRepo repoEventBinding) {
		this.repoEventBinding = repoEventBinding;
	}
	
	
	// TODO : change name to getAllEventBindingMappin()
	public Collection<EventBindingMapping> getEventBindingListener() {
				
		List<EventBinding> bindingList = (ArrayList<EventBinding>) this.repoEventBinding.findAll();
		
		Map<String , EventBindingMapping> tempResult = new LinkedHashMap<String , EventBindingMapping >();
		
		for (Iterator<EventBinding> iterator = bindingList.iterator(); iterator.hasNext();) {
			EventBinding eventBinding = (EventBinding) iterator.next();
			String eventKey = eventBinding.getEvent().getKey();
			if(tempResult.containsKey(eventKey)) {
				EventBindingMapping bindingMap = tempResult.get(eventKey);
				bindingMap.setListener(eventBinding.getListener());
			}
			else{
				EventBindingMapping ebm = new EventBindingMapping();
				ebm.setEvent(eventBinding.getEvent());
				ebm.setListener(eventBinding.getListener());
				tempResult.put(eventKey, ebm);
			};
		}
		return new ArrayList<EventBindingMapping>(tempResult.values());
	}
	
	public int addEventBindingListener(BindingListener bindingListener) {
		//TODO : check that (event.thingId) != (listener.thingId)
		Set<EventBinding> bindingSet = new HashSet<EventBinding>();
		Set<Integer> listListener = bindingListener.getListenersId();
		for (Iterator<Integer> iterator = listListener.iterator(); iterator.hasNext();) {
			EventBinding binding = new EventBinding();
			binding.setEvent(new Cloudevent(bindingListener.getEventId()));
			Integer listenerId = (Integer) iterator.next();
			binding.setListener(new Listener(listenerId));
			bindingSet.add(binding);
		}		
		repoEventBinding.saveAll(bindingSet);
		return bindingSet.size();
	}
	
	public boolean deleteEventBinding(Integer eventId , Integer listenerId) {
		
		Cloudevent eventObj = new Cloudevent(eventId);		
		Listener listenerObj = new Listener(listenerId);
		
		List<EventBinding> result = repoEventBinding.findByEventAndListener(eventObj, listenerObj);
		
		if (result.size() == 1) {
			EventBinding binding = result.get(0);
			repoEventBinding.deleteById(binding.getId());
			return true;
		} else {
			return false;
		}
	}
	
}
