package dev.cherattk.eventbox.admin.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Thing {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	protected int id;

	protected String name;

	protected String description;
	
	protected Thing() {}

	public Thing(String name, String description) {
		this.name = name;
		this.description = description;
	}

	public int getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getDescription() {
		return description;
	}

	@Override
	public String toString() {
		return String.format("Thing[id=%d, name='%s', description='%s']", this.id, this.name, this.description);
	}

}
