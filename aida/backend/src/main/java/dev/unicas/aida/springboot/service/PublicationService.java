package dev.unicas.aida.springboot.service;

import java.io.IOException;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.Response;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import cineca.iris.ir.rest.model.ItemRestPageDTO;
import cineca.iris.ir.rest.model.RmPersonRestDTO;
import cineca.iris.ir.rest.search.model.RestSearchCriteria;
import cineca.iris.ir.rest.search.model.RestSortCriteria;
import cineca.iris.ir.rest.search.model.SearchRestDTO;
import cineca.iris.restclient.main.RESTIRClient;

@Service
public class PublicationService {

	private final Logger log = LogManager.getLogger(getClass());

	private static RESTIRClient client;

	private static String restBaseURI = "https://iris.unicas.it:443/";

	private static String pathIR = "rest/api/v1/";

	private static String pathRM = "rm/restservices/api/v1";

	private static String username = "restadmin";

	private static String password = "1xR20151019sd2";

	public String findAll(String year) throws IOException, KeyManagementException, NoSuchAlgorithmException {

		client = new RESTIRClient(restBaseURI, pathIR, pathRM, username, password);
		client.buildUnsecureInstance();
		client.setConnectTimeOut(RESTIRClient.CONNECT_TIMEOUT);
		client.setReadTimeOut(RESTIRClient.READ_TIMEOUT);

		ObjectMapper mapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
				 false);
		// get a people
		Response response = client.personByCF("MLNMRA71R30Z133E");
		String responseString = response.readEntity(String.class);
		RmPersonRestDTO people = mapper.readValue(responseString, RmPersonRestDTO.class);
		log.info("People crisId: " + people.getCrisId() + "");

		// get a item 
		List<RestSearchCriteria> criteriaSearch = new ArrayList<RestSearchCriteria>();
		List<RestSortCriteria> sortingColsCriteria = new ArrayList<RestSortCriteria>();
		RestSearchCriteria userCriteria = new RestSearchCriteria("lookupValues_contextuser", "=", people.getCrisId());
		RestSearchCriteria yearCriteria = new RestSearchCriteria("lookupValues_year", "=", year);
		RestSortCriteria sortingCriteria = new RestSortCriteria("lookupValues_contextuser", true);
		criteriaSearch.add(yearCriteria);
		criteriaSearch.add(userCriteria);
		sortingColsCriteria.add(sortingCriteria);
		SearchRestDTO searchDTO = new SearchRestDTO(criteriaSearch, sortingColsCriteria, 0, 20, "all");
		Response items = client.items(searchDTO);
		String responseItemString = items.readEntity(String.class);
		ItemRestPageDTO item = mapper.readValue(responseItemString, ItemRestPageDTO.class);
		log.info("Item name: " + item.getRestResourseDTOList().get(0).getName() + "");

		return responseItemString;
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

}
