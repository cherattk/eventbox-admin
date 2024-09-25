package dev.cherattk.eventbox.admin.model;

import java.util.List;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;


@Entity
public class Thing {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected Integer thing_id;

	protected String name = "Thing Name";

	protected String description = "Thing Description";
	
	//@OneToMany(mappedBy = "thing" , cascade = CascadeType.REMOVE)
	@OneToMany(mappedBy = "thing")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<Cloudevent> cloudevents;
	
	//@OneToMany(mappedBy = "thing" , cascade = CascadeType.REMOVE)
	@OneToMany(mappedBy = "thing")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<Listener> listeners;
	
	public static enum ThingCategory {
		WEB_SERVICE,
		DEVICE;
    }
	
	//@Column(columnDefinition = "varchar(255) default 'Web Service'")
	@Enumerated(EnumType.STRING)
	protected ThingCategory category = ThingCategory.WEB_SERVICE;

	public Thing() {}
	
	public Thing(Integer id) {
		this.thing_id = id;
	}

	public Integer getId() {
		return thing_id;
	}

	public void setId(Integer id) {
		this.thing_id = id;
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
		return Objects.hash(category, thing_id, name);
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
		return category == other.category && Objects.equals(thing_id, other.thing_id) && Objects.equals(name, other.name);
	}	
	
	
	
	/*
	 * @Override public String toString() { return
	 * String.format("{id:%d, name:'%s', description:'%s' , category:'%s'}",
	 * this.thing_id, this.name, this.description , this.category);: }
	 */

}
