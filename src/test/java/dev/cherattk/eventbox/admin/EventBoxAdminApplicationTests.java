package dev.cherattk.eventbox.admin;

// test libraries
import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;

// used by application
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class EventBoxAdminApplicationTests {

	@Autowired
	private HomeController homeController;
	
	@Test
	void contextLoads() throws Exception{
		assertThat(homeController).isNotNull();
	}

}
