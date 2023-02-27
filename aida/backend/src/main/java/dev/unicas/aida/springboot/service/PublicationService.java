package dev.unicas.aida.springboot.service;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import dev.unicas.aida.springboot.model.dto.PublicationDto;

@Service
public class PublicationService {

	private final Logger log = LogManager.getLogger(getClass());

	public List<PublicationDto> findAll() {
		RestTemplate restTemplate = new RestTemplate();
		String fooResourceUrl = "http://localhost:8080/spring-rest/foos";
		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
		HttpEntity<String> httpEntity = new HttpEntity<>(this.createHeaders("username", "password"));
		ResponseEntity<String> response = restTemplate.exchange(fooResourceUrl + "/1", HttpMethod.GET, httpEntity,
				String.class);
		log.info(response.getStatusCode());
		return new ArrayList<PublicationDto>();
	}

	private HttpHeaders createHeaders(String username, String password) {
		return new HttpHeaders() {
			private static final long serialVersionUID = 1L;

			{
				String auth = username + ":" + password;
				byte[] encodedAuth = Base64.encodeBase64(auth.getBytes(Charset.forName("US-ASCII")));
				String authHeader = "Basic " + new String(encodedAuth);
				set("Authorization", authHeader);
			}
		};
	}

}
