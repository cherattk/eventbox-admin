package dev.cherattk.eventbox.admin.model;

import java.util.Objects;

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
	
	public static enum ThingCategory {
		WEB_SERVICE,
		DEVICE;
    }
	
	//@Column(columnDefinition = "varchar(255) default 'Web Service'")
	@Enumerated(EnumType.STRING)
	protected ThingCategory category = ThingCategory.WEB_SERVICE;

	public Thing() {}
	
	public Thing(Integer id) {
		this.id = id;
	}

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
	public int hashCode() {
		return Objects.hash(category, id, name);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Thing other = (Thing) obj;
		return category == other.category && Objects.equals(id, other.id) && Objects.equals(name, other.name);
	}	
	
	
	
	/*
	 * @Override public String toString() { return
	 * String.format("{id:%d, name:'%s', description:'%s' , category:'%s'}",
	 * this.id, this.name, this.description , this.category);: }
	 */

}
