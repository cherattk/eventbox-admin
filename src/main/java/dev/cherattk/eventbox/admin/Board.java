package dev.cherattk.eventbox.admin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Board {

	@GetMapping("/")
	public String Index() {
		return "Home Page";	
	}
	
}
