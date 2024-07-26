package dev.cherattk.eventbox.admin.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(uniqueConstraints = { 
		@UniqueConstraint(name="unique_Event_Listener" , 
				columnNames = { "event" , "listener"}) 
})
public class EventBinding {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected Integer id;
	
	@ManyToOne
	@JoinColumn(name = "event" , referencedColumnName="id" , nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	protected Cloudevent event;
	
	@ManyToOne
	@JoinColumn(name = "listener" , referencedColumnName="id" , nullable = true)
	protected Listener listener;

	public EventBinding() {}

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}

	public Cloudevent getEvent() {
		return event;
	}

	public void setEvent(Cloudevent event) {
		this.event = event;
	}

	public Listener getListener() {
		return listener;
	}

	public void setListener(Listener listener) {
		this.listener = listener;
	}	
}