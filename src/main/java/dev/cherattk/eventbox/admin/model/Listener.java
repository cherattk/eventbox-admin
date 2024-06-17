package dev.cherattk.eventbox.admin.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Listener {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected Integer id;

	@Column( name= "thingid")
	protected Integer thing_id;
	
	@Column( name= "name")
	protected String name;

	@Column( name= "url")
	protected String url;
	
	public Listener() {}

	/**
	 * Like Model.Cloudevent class this constructor is used in APIcontroller.bindListener()
	 * @param id
	 */
	
	public Listener(Integer id) {
		super();
		this.id = id;
	}



	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}


	public Integer getThingId() {
		return thing_id;
	}

	public void setThingId(Integer thing_id) {
		this.thing_id = thing_id;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
	
	

}
