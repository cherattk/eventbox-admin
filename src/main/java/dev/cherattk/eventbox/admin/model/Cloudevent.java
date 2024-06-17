package dev.cherattk.eventbox.admin.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.web.bind.annotation.PostMapping;

@Entity
public class Cloudevent{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected Integer id;
	
	@Column( name= "thingid")
	protected Integer thing_id;
	
	@Column( name= "name")
	protected String name;
	
	@Column( name= "description")
	protected String description;
	
	/////////////////////////////////////////
	// CloudEvent Attributes
	////////////////////////////////////////
	@Column( name= "ce_specversion")
	protected String specversion;
	
	@Column( name= "ce_source")
	protected String source;
	
	@Column( name= "ce_type")
	protected String type;
	
	@Column( name= "ce_datacontenttype")
	protected String datacontenttype;
	
	@Column( name= "ce_dataschema")
	protected String dataschema;
	
	public Cloudevent() {}
	
	/** 
	 * Like Model.Listener class this constructor is 
	 * used in APIcontroller.bindListener()
	 * @param id
	 */
	public Cloudevent(Integer id) {
		this.id = id;
	}

	public Integer getId() {
		return id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}
	
	public void setThingId(Integer thing_id) {
		 this.thing_id = thing_id;
	}
	
	public Integer getThingId() {
		return thing_id;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	public String getSpecversion() {
		return specversion;
	}

	public void setSpecversion(String specversion) {
		this.specversion = specversion;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getDatacontenttype() {
		return datacontenttype;
	}

	public void setDatacontenttype(String datacontenttype) {
		this.datacontenttype = datacontenttype;
	}

	public String getDataschema() {
		return dataschema;
	}

	public void setDataschema(String dataschema) {
		this.dataschema = dataschema;
	}
	
	

}
