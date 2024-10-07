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
import javax.persistence.Transient;
import javax.persistence.UniqueConstraint;

import org.springframework.http.MediaType;

@Entity
@Table(uniqueConstraints = { 
		@UniqueConstraint(name="unique_Source_Type" , 
				columnNames = { "source" , "type" }) 
})
public class Cloudevent{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected Integer id;
	
	@ManyToOne
	@JoinColumn( name = "thing_id")
	protected Thing thing;
	
	protected String name = "name";
	
	protected String description = "description";
	
	@Transient
	private String key;
	
	/////////////////////////////////////////
	// CloudEvent Attributes
	////////////////////////////////////////
	@Column(nullable = false)
	protected String specversion;
	
	@Column(nullable = false)
	protected String source;
	
	@Column(nullable = false)
	protected String type;
	
	@Column(nullable = false)
	protected String datacontenttype = MediaType.APPLICATION_JSON_VALUE;
	
	@Column(nullable = false)
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
	
	public void setId(Integer id) {
		this.id = id;
	}
	
	public void setThing(Thing thing) {
		 this.thing = thing;
	}
	
	public Thing getThing() {
		return thing;
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
