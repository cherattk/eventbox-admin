package dev.cherattk.eventbox.admin.model;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(uniqueConstraints = { 
		@UniqueConstraint(name="unique_endpoint" , 
				columnNames = { "endpoint"}) 
})
public class Listener {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected Integer id;

	@ManyToOne
	@JoinColumn( name = "thing_id")
	protected Thing thing;
	
	protected String endpoint;
	
	protected String protocol = "http";
	
	public Listener() {}
	
	public Listener(Integer id, String endpoint) {
		this.id = id;
		this.endpoint = endpoint;
	}

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

	public Thing getThing() {
		return thing;
	}

	public void setThing(Thing thing) {
		this.thing = thing;
	}

	public String getEndpoint() {
		return endpoint;
	}

	public void setEndpoint(String endpoint) {
		this.endpoint = endpoint;
	}

	public String getProtocol() {
		return protocol;
	}

	public void setProtocol(String protocol) {
		this.protocol = protocol;
	}

	@Override
	public int hashCode() {
		return Objects.hash(endpoint);
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
		return Objects.equals(endpoint, other.endpoint);
	}
	
	
	
	

}
