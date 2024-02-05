package dev.cherattk.eventbox.admin.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Listener {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	protected int id;

	@Column( name= "thingid")
	protected int thing_id;

	@Column( name= "endpoint")
	protected String endpoint;
	
	protected Listener() {}

	public int getId() {
		return id;
	}

	public int getThingId() {
		return thing_id;
	}

	public void setThingId(int thing_id) {
		this.thing_id = thing_id;
	}

	public String getEndpoint() {
		return endpoint;
	}

	public void setEndpoint(String endpoint) {
		this.endpoint = endpoint;
	}
	
	

}
