package dev.cherattk.eventbox.admin.model;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.UniqueConstraint;

import org.springframework.http.MediaType;

@Entity
@Table(uniqueConstraints = { 
		@UniqueConstraint(name="unique_Thing_Spec_Source_Type" , 
				columnNames = { "thingId" , "ce_specversion", "ce_source" , "ce_type" }) 
})
public class Cloudevent{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected Integer id;
	
	@Column( name= "thingId" , nullable = false)
	protected Integer thingId;
	
	@Column( name= "name")
	protected String name = "name";
	
	@Column( name= "description")
	protected String description = "description";
	
	@Transient
	private String key;
	
	/////////////////////////////////////////
	// CloudEvent Attributes
	////////////////////////////////////////
	@Column( name= "ce_specversion" , nullable = false)
	protected String specversion;
	
	@Column( name= "ce_source" , nullable = false)
	protected String source;
	
	@Column( name= "ce_type" , nullable = false)
	protected String type;
	
	@Column( name= "ce_datacontenttype")
	protected String datacontenttype = MediaType.APPLICATION_JSON_VALUE;
	
	@Column( name= "ce_dataschema" , nullable = true)
	protected String dataschema;
	
	public Cloudevent() {}
	
	public Cloudevent(Integer id , String specversion , String source , String type) {
		this.id = id;
		this.specversion = specversion;
		this.source = source;
		this.type = type;
	}

	/**
	 * This constructor is required in EventBindingService.addEventBindingListener()
	 * @param id
	 */
	public Cloudevent(Integer id) {
		this.id = id;
	}
	
	public String getKey() {
		return this.specversion + "," + this.source + "," + this.type;
	}
	
	public Integer getId() {
		return id;
	}
	
	public Cloudevent setId(Integer id) {
		this.id = id;
		return this;
	}
	
	public Cloudevent setThingId(Integer thingId) {
		 this.thingId = thingId;
		 return this;
	}
	
	public Integer getThingId() {
		return thingId;
	}
	
	public String getName() {
		return name;
	}

	public Cloudevent setName(String name) {
		this.name = name;
		return this;
	}
	
	public String getDescription() {
		return description;
	}

	public Cloudevent setDescription(String description) {
		this.description = description;
		return this;
	}
	
	public String getSpecversion() {
		return specversion;
	}

	public Cloudevent setSpecversion(String specversion) {
		this.specversion = specversion;
		return this;
	}

	public String getSource() {
		return source;
	}

	public Cloudevent setSource(String source) {
		this.source = source;
		return this;
	}

	public String getType() {
		return type;
	}

	public Cloudevent setType(String type) {
		this.type = type;
		return this;
	}

	public String getDatacontenttype() {
		return datacontenttype;
	}

	public Cloudevent setDatacontenttype(String datacontenttype) {
		this.datacontenttype = datacontenttype;
		return this;
	}

	public String getDataschema() {
		return dataschema;
	}

	public Cloudevent setDataschema(String dataschema) {
		this.dataschema = dataschema;
		return this;
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(specversion, source , type);
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Cloudevent other = (Cloudevent) obj;
		return Objects.equals(specversion, other.specversion) && Objects.equals(source, other.source)
				&& Objects.equals(type, other.type);
	}
	
	
	
}
