package dev.cherattk.eventbox.admin.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Cloudevent{

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	protected String id;
	
	@Column( name= "thingid")
	protected int thing_id;
	
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
	
	protected Cloudevent() {}
	
	public String getId() {
		return id;
	}
	
	public void setThingId(int thing_id) {
		 this.thing_id = thing_id;
	}
	
	public int getThingId() {
		return thing_id;
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
