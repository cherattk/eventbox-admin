package dev.cherattk.eventbox.admin.model;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CloudeventRepo extends CrudRepository<Cloudevent, Integer> {
	
}
