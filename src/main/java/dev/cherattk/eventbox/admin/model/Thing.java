package dev.cherattk.eventbox.admin.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class Thing {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected Integer id;

	protected String name = "Thing Name";

	protected String description = "Thing Description";
	
	protected enum ThingCategory {
		WEB_SERVICE, DEVICE	    
    }
	
	//@Column(columnDefinition = "varchar(255) default 'Web Service'")
	@Enumerated(EnumType.STRING)
	protected ThingCategory category = ThingCategory.WEB_SERVICE;

	public Thing() {}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public String getName() {
		return name;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	public String getDescription() {
		return description;
	}

	public void setCategory(ThingCategory category) {
		this.category = category;
	}
	
	public ThingCategory getCategory() {
		return category;
	}	
	
	@Override
	public String toString() {
		return String.format("Thing[id=%d, name='%s', description='%s' , category='%s']", this.id, this.name, this.description , this.category);
	}

}
