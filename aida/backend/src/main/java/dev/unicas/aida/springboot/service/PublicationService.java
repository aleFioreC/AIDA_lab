package dev.unicas.aida.springboot.service;

import java.io.IOException;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.util.Properties;

import javax.ws.rs.core.Response;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import cineca.iris.ir.rest.model.ItemRestDTO;
import cineca.iris.ir.rest.model.ItemRestPageDTO;
import cineca.iris.restclient.main.PropertiesReader;
import cineca.iris.restclient.main.RESTIRClient;

@Service
public class PublicationService {

	private final Logger log = LogManager.getLogger(getClass());

	private static RESTIRClient client;

	public String findAll() throws IOException, KeyManagementException, NoSuchAlgorithmException {

		PropertiesReader reader = new PropertiesReader();
		Properties prop = reader.getProperties();
		String restBaseURI = prop.getProperty("BASE_URI"), pathIR = prop.getProperty("PATH_IR"),
				pathRM = prop.getProperty("PATH_RM"), username = prop.getProperty("USERNAME"),
				password = prop.getProperty("PASSWORD");
		client = new RESTIRClient(restBaseURI, pathIR, pathRM, username, password);
		client.buildUnsecureInstance();
		client.setConnectTimeOut(RESTIRClient.CONNECT_TIMEOUT);
		client.setReadTimeOut(RESTIRClient.READ_TIMEOUT);

		// call test Echo IR and RM service
		ObjectMapper mapper = new ObjectMapper();
		Response response = client.echoIR();
		String responseString = response.readEntity(String.class);
		log.info("check IR: " + responseString);
		response = client.echoRM();
		responseString = response.readEntity(String.class);
		log.info("check RM: " + responseString);

		// get a random item
		response = client.items(1, 37);
		responseString = response.readEntity(String.class);
		ItemRestPageDTO items = mapper.readValue(responseString, ItemRestPageDTO.class);
		ItemRestDTO item = items.getRestResourseDTOList().get(0);
		log.info("item:" + item.getItemId() + "[" + item.getHandle() + "]");

		return responseString;
	}

	/*
	 * public String findAll() { RestTemplate restTemplate = new RestTemplate();
	 * String url = "https://jsonplaceholder.typicode.com/posts"; HttpHeaders
	 * headers = new HttpHeaders();
	 * headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
	 * 
	 * HttpEntity<String> httpEntity = new
	 * HttpEntity<>(this.createHeaders("username", "password"));
	 * 
	 * ResponseEntity<String> response = restTemplate.exchange(fooResourceUrl,
	 * HttpMethod.GET, httpEntity, String.class);
	 * 
	 * ResponseEntity<String> response = restTemplate.getForEntity(url,
	 * String.class); log.info(response.getStatusCode()); return response.getBody();
	 * }
	 * 
	 * public IRISResult findAllR() throws JsonParseException, JsonMappingException,
	 * IOException { IRISPeople people = this.findAllPeople();
	 * System.out.println(people.toString()); ObjectMapper mapper = new
	 * ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
	 * false); InputStream is =
	 * PublicationService.class.getResourceAsStream("/publications.json");
	 * IRISResult result = mapper.readValue(is, IRISResult.class); return result; }
	 * 
	 * 
	 * public IRISPeople findAllPeople() throws JsonParseException,
	 * JsonMappingException, IOException { ObjectMapper mapper = new
	 * ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
	 * false); InputStream is =
	 * PublicationService.class.getResourceAsStream("/people.json"); IRISPeople
	 * result = mapper.readValue(is, IRISPeople.class); return result;
	 */

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
