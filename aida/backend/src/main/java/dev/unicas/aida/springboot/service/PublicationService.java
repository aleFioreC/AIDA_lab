package dev.unicas.aida.springboot.service;

import java.io.IOException;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.Response;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;

import cineca.iris.ir.rest.model.CollectionResponse;
import cineca.iris.ir.rest.model.RmPersonRestDTO;
import cineca.iris.ir.rest.search.model.RestSearchCriteria;
import cineca.iris.ir.rest.search.model.RestSortCriteria;
import cineca.iris.ir.rest.search.model.SearchRestDTO;
import cineca.iris.restclient.main.RESTIRClient;
import dev.unicas.aida.springboot.model.People;

@Service
public class PublicationService {

	private final Logger log = LogManager.getLogger(getClass());

	private static RESTIRClient client;

	private static String restBaseURI = "https://iris.unicas.it:443/";

	private static String pathIR = "rest/api/v1/";

	private static String pathRM = "rm/restservices/api/v1";

	private static String username = "restadmin";

	private static String password = "1xR20151019sd2";
	
	@Autowired
	private PeopleService service;

	public List<CollectionResponse> findAll(String year) throws IOException, KeyManagementException, NoSuchAlgorithmException {

		client = new RESTIRClient(restBaseURI, pathIR, pathRM, username, password);
		client.buildUnsecureInstance();
		client.setConnectTimeOut(RESTIRClient.CONNECT_TIMEOUT);
		client.setReadTimeOut(RESTIRClient.READ_TIMEOUT);

		ObjectMapper mapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
				 false);
		
		List<People> research = service.findAll();
		
		List<CollectionResponse> itemsToReturn = new ArrayList<CollectionResponse>();
		
		for (People people : research) {
			
			// get a people
			Response response = client.personByCF(people.getCf());
			String responseString = response.readEntity(String.class);
			RmPersonRestDTO person = mapper.readValue(responseString, RmPersonRestDTO.class);
			
			// get a item 
			List<RestSearchCriteria> criteriaSearch = new ArrayList<RestSearchCriteria>();
			List<RestSortCriteria> sortingColsCriteria = new ArrayList<RestSortCriteria>();
			RestSearchCriteria userCriteria = new RestSearchCriteria("lookupValues_contextuser", "=", person.getCrisId());
			RestSearchCriteria yearCriteria = new RestSearchCriteria("lookupValues_year", "=", year);
			RestSortCriteria sortingCriteria = new RestSortCriteria("lookupValues_contextuser", true);
			criteriaSearch.add(yearCriteria);
			criteriaSearch.add(userCriteria);
			sortingColsCriteria.add(sortingCriteria);
			SearchRestDTO searchDTO = new SearchRestDTO(criteriaSearch, sortingColsCriteria, 0, 20, "all");
			Response items = client.items(searchDTO);
			String responseItemString = items.readEntity(String.class);
			
			log.info("Item response IRIS {}", responseItemString);

			Gson g = new Gson();  
			CollectionResponse s = g.fromJson(responseItemString, CollectionResponse.class);
			
			itemsToReturn.add(s);
		}

		return itemsToReturn;
	}


}
