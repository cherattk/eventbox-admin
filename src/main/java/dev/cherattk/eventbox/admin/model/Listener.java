package dev.cherattk.eventbox.admin.model;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(uniqueConstraints = { 
		@UniqueConstraint(name="unique_Thing_Url" , 
				columnNames = { "thingId" , "url"}) 
})
public class Listener {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected Integer id;

	@Column( name= "thingId")
	protected Integer thingId;
	
	@Column( name= "name")
	protected String name;

	@Column( name= "url")
	protected String url;
	
	public Listener() {}
	
	/**
	 * This constructor is used in APIController.bindListener() method
	 * @param id
	 */
	public Listener(Integer id) {
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
		return thingId;
	}

	public void setThingId(Integer thingId) {
		this.thingId = thingId;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	@Override
	public int hashCode() {
		return Objects.hash(thingId, url);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Listener other = (Listener) obj;
		return Objects.equals(thingId, other.thingId) && Objects.equals(url, other.url);
	}
	
	
	
	

}
