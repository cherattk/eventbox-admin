package dev.cherattk.eventbox.admin.model;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListenerRepo extends CrudRepository<Listener, Integer> {

}
