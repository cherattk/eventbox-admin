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
		@UniqueConstraint(name="unique_Url" , 
				columnNames = { "url"}) 
})
public class Listener {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected Integer id;

	@ManyToOne
	@JoinColumn( name = "thing_id")
	protected Thing thing;
	
	@Column( name= "name")
	protected String name;

	@Column( name= "url")
	protected String url;
	
	public Listener() {}	
	
	public Listener(Integer id, String name, String url) {
		this.id = id;
		this.name = name;
		this.url = url;
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}


	public Thing getThing() {
		return thing;
	}

	public void setThing(Thing thing) {
		this.thing = thing;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	@Override
	public int hashCode() {
		return Objects.hash(url);
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
		return Objects.equals(url, other.url);
	}
	
	
	
	

}
