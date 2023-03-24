package dev.unicas.aida.springboot.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.Collections;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import dev.unicas.aida.springboot.model.iris.IRISPeople;
import dev.unicas.aida.springboot.model.iris.IRISResult;

@Service
public class PublicationService {

	private final Logger log = LogManager.getLogger(getClass());

	public String findAll() {
		RestTemplate restTemplate = new RestTemplate();
		String url = "https://jsonplaceholder.typicode.com/posts";
		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
		/*
		 * HttpEntity<String> httpEntity = new
		 * HttpEntity<>(this.createHeaders("username", "password"));
		 * 
		 * ResponseEntity<String> response = restTemplate.exchange(fooResourceUrl,
		 * HttpMethod.GET, httpEntity, String.class);
		 */
		ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
		log.info(response.getStatusCode());
		return response.getBody();
	}

	public IRISResult findAllR() throws JsonParseException, JsonMappingException, IOException {
		IRISPeople people = this.findAllPeople();
		System.out.println(people.toString());
		ObjectMapper mapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		InputStream is = PublicationService.class.getResourceAsStream("/publications.json");
		IRISResult result = mapper.readValue(is, IRISResult.class);
		return result;
	}
	

	public IRISPeople findAllPeople() throws JsonParseException, JsonMappingException, IOException {
		ObjectMapper mapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		InputStream is = PublicationService.class.getResourceAsStream("/people.json");
		IRISPeople result = mapper.readValue(is, IRISPeople.class);
		return result;
	}

	/*
	 * private HttpHeaders createHeaders(String username, String password) { return
	 * new HttpHeaders() { private static final long serialVersionUID = 1L;
	 * 
	 * { String auth = username + ":" + password; byte[] encodedAuth =
	 * Base64.encodeBase64(auth.getBytes(Charset.forName("US-ASCII"))); String
	 * authHeader = "Basic " + new String(encodedAuth); set("Authorization",
	 * authHeader); } }; }
	 */

}
