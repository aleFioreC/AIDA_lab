/*
 *  Java Iris Rest Client, pratical example for use IRIS REST API
 * 
 *  Copyright (c) 2015, CINECA and third-party contributors as
 *  indicated by the @author tags or express copyright attribution
 *  statements applied by the authors.  All third-party contributions are
 *  distributed under license by CINECA.
 * 
 *  This copyrighted material is made available to anyone wishing to use, modify,
 *  copy, or redistribute it subject to the terms and conditions of the GNU
 *  Lesser General Public License v3 or any later version, as published 
 *  by the Free Software Foundation, Inc. <http://fsf.org/>.
 * 
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 *  or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public License
 *  for more details.
 * 
 *  You should have received a copy of the GNU Lesser General Public License
 *  along with this distribution; if not, write to:
 *  Free Software Foundation, Inc.
 *  51 Franklin Street, Fifth Floor
 *  Boston, MA  02110-1301  USA
 */
package cineca.iris.restclient.main;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.X509TrustManager;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedHashMap;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;

import org.glassfish.jersey.client.ClientProperties;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataMultiPart;
import org.glassfish.jersey.media.multipart.MultiPart;
import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.glassfish.jersey.media.multipart.file.FileDataBodyPart;
import org.glassfish.jersey.media.multipart.file.StreamDataBodyPart;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

import cineca.iris.ir.rest.command.model.BitstreamOptionsDTO;
import cineca.iris.ir.rest.model.AuthorityRestDTO;
import cineca.iris.ir.rest.model.ErrorResponse;
import cineca.iris.ir.rest.model.ItemRestWriteDTO;
import cineca.iris.ir.rest.model.utils.AuthorityEnum;
import cineca.iris.ir.rest.model.utils.HeaderScopeEnum;
import cineca.iris.ir.rest.search.model.AnceSearchRestDTO;
import cineca.iris.ir.rest.search.model.SearchIdsRestDTO;
import cineca.iris.ir.rest.search.model.SearchRestDTO;
import cineca.iris.restclient.secure.DummyX509TrustManager;

/**
 * 
 * @author pmeriggi
 *
 */
public class RESTIRClient {

	private WebTarget webTarget;

	private Client client;

	ObjectMapper mapper;
	private final String username;
	private final String password;
	private final String baseURI;
	private final String pathIR;
	private final String pathRM;
	private Integer connectTimeOut;
	private Integer readTimeOut;

	// 20 min
	public static final Integer CONNECT_TIMEOUT = 1200000;
	public static final Integer READ_TIMEOUT = 1200000;

	public String getBaseURI() {
		return baseURI;
	}

	public String getPathIR() {
		return pathIR;
	}

	public String getPathRM() {
		return pathRM;
	}

	public RESTIRClient(String baseURI, String pathIR, String pathRM, String username, String password) {
		this.username = username;
		this.password = password;

		this.baseURI = baseURI;
		this.pathIR = pathIR;
		this.pathRM = pathRM;

		this.connectTimeOut = CONNECT_TIMEOUT;
		this.readTimeOut = READ_TIMEOUT;
		
		mapper = new ObjectMapper();
	}

	public RESTIRClient(String baseURI, String pathIR, String pathRM, String username, String password,
			Integer connectTimeOut, Integer readTimeOut) {
		this.username = username;
		this.password = password;

		this.baseURI = baseURI;
		this.pathIR = pathIR;
		this.pathRM = pathRM;

		this.connectTimeOut = connectTimeOut;
		this.readTimeOut = readTimeOut;
		
		mapper = new ObjectMapper();
	}

	/**
	 * Build client for self-signed SSL certified
	 */
	public void buildUnsecureInstance() throws KeyManagementException, NoSuchAlgorithmException {
		this.client = ClientBuilder.newBuilder().sslContext(getSSLContext()).hostnameVerifier(getHostnameVerifier())
				.register(new Authenticator(username, password)).register(MultiPartFeature.class).build();
		setTimeout();
	}

	/**
	 * Build client
	 */
	public void buildSecureInstance() {
		this.client = ClientBuilder.newBuilder().register(new Authenticator(username, password))
				.register(MultiPartFeature.class).build();
		setTimeout();
	}

	/**
	 * Set time out
	 */
	private void setTimeout() {
		// Connect timeout interval, in milliseconds.
		this.client.property(ClientProperties.CONNECT_TIMEOUT, this.connectTimeOut);
		// Read timeout interval, in milliseconds.
		this.client.property(ClientProperties.READ_TIMEOUT, this.readTimeOut);
	}

	/**
	 * Set connection timeout
	 * 
	 * @param connectTimeOut
	 */
	public void setConnectTimeOut(Integer connectTimeOut) {
		this.connectTimeOut = connectTimeOut;
		this.client.property(ClientProperties.CONNECT_TIMEOUT, this.connectTimeOut);
	}

	/**
	 * Set read timeout
	 * 
	 * @param readTimeOut
	 */
	public void setReadTimeOut(Integer readTimeOut) {
		this.readTimeOut = readTimeOut;
		this.client.property(ClientProperties.READ_TIMEOUT, this.readTimeOut);
	}

	/**
	 * Get connection timeout
	 * 
	 * @return
	 */
	public Integer getConnectTimeOut() {
		return this.connectTimeOut;
	}

	/**
	 * Get read timeout
	 * 
	 * @return
	 */
	public Integer getReadTimeOut() {
		return this.readTimeOut;
	}

	/**
	 * Bybass SSL verify
	 * 
	 * @return
	 */
	private HostnameVerifier getHostnameVerifier() {
		HostnameVerifier hv = new HostnameVerifier() {

			@Override
			public boolean verify(String arg0, SSLSession arg1) {
				return true;
			}
		};

		return hv;
	}

	/**
	 * SSL Context Dummy
	 * 
	 * @return
	 * @throws NoSuchAlgorithmException
	 * @throws KeyManagementException
	 */
	private SSLContext getSSLContext() throws NoSuchAlgorithmException, KeyManagementException {
		SSLContext sslcontext = SSLContext.getInstance("TLS");
		sslcontext.init(null, new X509TrustManager[] { new DummyX509TrustManager() }, new java.security.SecureRandom());
		return sslcontext;
	}

	/**
	 * Echo IR test
	 * 
	 * @return
	 */
	public Response echoIR() throws IOException {
		this.webTarget = this.client.target(baseURI + pathIR).path("echo");

		Response response = this.webTarget.request(MediaType.APPLICATION_JSON).get();
		if (response.getStatus() != 200) {
			ErrorResponse error = mapper.readValue(response.readEntity(String.class), ErrorResponse.class);
			throw new RuntimeException("Failed : HTTP error code : " + response.getStatus() + " - "+ error.getMessage());
		}
		return response;
	}

	/**
	 * Echo RM test
	 * 
	 * @return
	 */
	public Response echoRM() throws IOException {
		this.webTarget = this.client.target(baseURI + pathRM).path("echo");

		Response response = this.webTarget.request(MediaType.APPLICATION_JSON).get();
		if (response.getStatus() != 200) {
			ErrorResponse error = mapper.readValue(response.readEntity(String.class), ErrorResponse.class);
			throw new RuntimeException("Failed : HTTP error code : " + response.getStatus() + " - "+ error.getMessage());
		}
		return response;
	}

	/**
	 * Get all communities
	 * 
	 * @return
	 */
	public Response communities() throws IOException {
		this.webTarget = this.client.target(baseURI + pathIR).path("communities");

		Response response = this.webTarget.request(MediaType.APPLICATION_JSON).get();
		if (response.getStatus() != 200) {
			ErrorResponse error = mapper.readValue(response.readEntity(String.class), ErrorResponse.class);
			throw new RuntimeException("Failed : HTTP error code : " + response.getStatus() + " - "+ error.getMessage());
		}
		return response;
	}

	/**
	 * Get community give id
	 * 
	 * @param communityId
	 * @return
	 */
	public Response community(String communityId) throws IOException {
		this.webTarget = this.client.target(baseURI + pathIR).path("communities/" + communityId);

		Response response = this.webTarget.request(MediaType.APPLICATION_JSON).get();
		if (response.getStatus() != 200) {
			ErrorResponse error = mapper.readValue(response.readEntity(String.class), ErrorResponse.class);
			throw new RuntimeException("Failed : HTTP error code : " + response.getStatus() + " - "+ error.getMessage());
		}
		return response;
	}

	/**
	 * Get all collection
	 * 
	 * @return
	 */
	public Response collections() throws IOException {
		this.webTarget = this.client.target(baseURI + pathIR).path("collections");

		Response response = this.webTarget.request(MediaType.APPLICATION_JSON).get();
		if (response.getStatus() != 200) {
			ErrorResponse error = mapper.readValue(response.readEntity(String.class), ErrorResponse.class);
			throw new RuntimeException("Failed : HTTP error code : " + response.getStatus() + " - "+ error.getMessage());
		}
		return response;
	}

	/**
	 * Get collection by id
	 * 
	 * @param collectionId
	 * @return
	 */
	public Response collection(String collectionId) throws IOException {
		this.webTarget = this.client.target(baseURI + pathIR).path("collections/" + collectionId);

		Response response = this.webTarget.request(MediaType.APPLICATION_JSON).get();
		if (response.getStatus() != 200) {
			ErrorResponse error = mapper.readValue(response.readEntity(String.class), ErrorResponse.class);
			throw new RuntimeException("Failed : HTTP error code : " + response.getStatus() + " - "+ error.getMessage());
		}
		return response;
	}

	/**
	 * Get collection by handle
	 * 
	 * @param collectionId
	 * @return
	 */
	public Response collection(String authorityName, String localName) throws IOException {
		this.webTarget = this.client.target(baseURI + pathIR).path("collections/" + authorityName + "/" + localName);

		Response response = this.webTarget.request(MediaType.APPLICATION_JSON).get();
		if (response.getStatus() != 200) {
			ErrorResponse error = mapper.readValue(response.readEntity(String.class), ErrorResponse.class);
			throw new RuntimeException("Failed : HTTP error code : " + response.getStatus() + " - "+ error.getMessage());
		}
		return response;
	}

	/**
	 * Get item by Id
	 * 
	 * @param itemId
	 * @return
	 */
	public Response item(String itemId) throws IOException {
		this.webTarget = this.client.target(baseURI + pathIR).path("items/" + itemId);

		Response response = this.webTarget.request(MediaType.APPLICATION_JSON)
				.header(HeaderScopeEnum.getHeaderTag(), HeaderScopeEnum.ROLE_ADMIN.getHeaderValue()).get();
		if (response.getStatus() != 200) {
			ErrorResponse error = mapper.readValue(response.readEntity(String.class), ErrorResponse.class);
			throw new RuntimeException("Failed : HTTP error code : " + response.getStatus() + " - "+ error.getMessage());
		}
		return response;
	}

	/**
	 * Get all item data by Id
	 * 
	 * @param itemId
	 * @return
	 */
	public Response itemAll(String itemId) throws IOException {
		this.webTarget = this.client.target(baseURI + pathIR).path("items/" + itemId).queryParam("expand", "all");

		Response response = this.webTarget.request(MediaType.APPLICATION_JSON)
				.header(HeaderScopeEnum.getHeaderTag(), HeaderScopeEnum.ROLE_ADMIN.getHeaderValue()).get();
		if (response.getStatus() != 200) {
			ErrorResponse error = mapper.readValue(response.readEntity(String.class), ErrorResponse.class);
			throw new RuntimeException("Failed : HTTP error code : " + response.getStatus() + " - "+ error.getMessage());
		}
		return response;
	}

	/**
	 * Get all items data by Id
	 * 
	 * @param limit
	 * @param offset
	 * @return
	 */
	public Response itemsAll(Integer limit, Integer offset) throws IOException {
		this.webTarget = this.client.target(baseURI + pathIR).path("items/").queryParam("expand", "all")
				.queryParam("limit", limit).queryParam("offset", offset);

		Response response = this.webTarget.request(MediaType.APPLICATION_JSON)
				.header(HeaderScopeEnum.getHeaderTag(), HeaderScopeEnum.ROLE_ADMIN.getHeaderValue()).get();
		if (response.getStatus() != 200) {
			ErrorResponse error = mapper.readValue(response.readEntity(String.class), ErrorResponse.class);
			throw new RuntimeException("Failed : HTTP error code : " + response.getStatus() + " - "+ error.getMessage());
		}
		return response;
	}

	/**
	 * Get all items by Id
	 * 
	 * @param limit
	 * @param offset
	 * @return
	 */
	public Response items(Integer limit, Integer offset) throws IOException {
		this.webTarget = this.client.target(baseURI + pathIR).path("items/").queryParam("limit", limit)
				.queryParam("offset", offset);

		Response response = this.webTarget.request(MediaType.APPLICATION_JSON)
				.header(HeaderScopeEnum.getHeaderTag(), HeaderScopeEnum.ROLE_ADMIN.getHeaderValue()).get();
		if (response.getStatus() != 200) {
			ErrorResponse error = mapper.readValue(response.readEntity(String.class), ErrorResponse.class);
			throw new RuntimeException("Failed : HTTP error code : " + response.getStatus() + " - "+ error.getMessage());
		}
		return response;
	}

	/**
	 * Get item metadata by item id
	 * 
	 * @param itemId
	 * @return
	 */
	public Response itemWithMetadata(String itemId) throws IOException {
		this.webTarget = this.client.target(baseURI + pathIR).path("items/" + itemId).queryParam("expand", "metadata");

		Response response = this.webTarget.request(MediaType.APPLICATION_JSON)
				.header(HeaderScopeEnum.getHeaderTag(), HeaderScopeEnum.ROLE_ADMIN.getHeaderValue()).get();
		if (response.getStatus() != 200) {
			ErrorResponse error = mapper.readValue(response.readEntity(String.class), ErrorResponse.class);
			throw new RuntimeException("Failed : HTTP error code : " + response.getStatus() + " - "+ error.getMessage());
		}
		return response;
	}

	/**
	 * Get input form by id
	 * 
	 * @param inputFormId
	 * @return
	 */
	public Response inputFormAll(String inputFormId) throws IOException {
		this.webTarget = this.client.target(baseURI + pathIR).path("inputforms/" + inputFormId).queryParam("expand",
				"all");

		Response response = this.webTarget.request(MediaType.APPLICATION_JSON).get();
		if (response.getStatus() != 200) {
			ErrorResponse error = mapper.readValue(response.readEntity(String.class), ErrorResponse.class);
			throw new RuntimeException("Failed : HTTP error code : " + response.getStatus() + " - "+ error.getMessage());
		}
		return response;
	}

	/**
	 * Search item by dto
	 * 
	 * @param searchDTO
	 * @return
	 * @throws IOException
	 */
	public Response items(SearchRestDTO searchDTO) throws IOException {
		this.webTarget = this.client.target(baseURI + pathIR).path("items/search");

		ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
		String jsonSearchDTO = ow.writeValueAsString(searchDTO);

		Response response = this.webTarget.request(MediaType.APPLICATION_JSON)
				.header(HeaderScopeEnum.getHeaderTag(), HeaderScopeEnum.ROLE_ADMIN.getHeaderValue())
				.post(Entity.entity(jsonSearchDTO, MediaType.APPLICATION_JSON));
		if (response.getStatus() != 200) {
			ErrorResponse error = mapper.readValue(response.readEntity(String.class), ErrorResponse.class);
			throw new RuntimeException("Failed : HTTP error code : " + response.getStatus() + " - "+ error.getMessage());
		}
		return response;
	}

	/**
	 * Search item by dto
	 * 
	 * @param searchDTO
	 * @return
	 * @throws IOException
	 */
	public Response createItem(ItemRestWriteDTO itemDTO, MultivaluedMap<String, Object> headers) throws IOException {
		this.webTarget = this.client.target(baseURI + pathIR).path("items");

		ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
		String jsonItemDTO = ow.writeValueAsString(itemDTO);
		
		//test
		System.out.println(Entity.entity(jsonItemDTO, MediaType.APPLICATION_JSON).toString());
		
		Response response = this.webTarget.request(MediaType.APPLICATION_JSON).headers(headers)
				.post(Entity.entity(jsonItemDTO, MediaType.APPLICATION_JSON));
		
		if (response.getStatus() != 201) {
			ErrorResponse error = mapper.readValue(response.readEntity(String.class), ErrorResponse.class);
			throw new RuntimeException("Failed : HTTP error code : " + response.getStatus() + " - "+ error.getMessage());
		}

		return response;
	}

	/**
	 * Get list item id by dto
	 * 
	 * @param searchDTO
	 * @return
	 * @throws IOException
	 */
	public Response itemIds(SearchIdsRestDTO searchDTO) throws IOException {
		this.webTarget = this.client.target(baseURI + pathIR).path("items/ids/search");

		ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
		String jsonSearchDTO = ow.writeValueAsString(searchDTO);

		Response response = this.webTarget.request(MediaType.APPLICATION_JSON)
				.header(HeaderScopeEnum.getHeaderTag(), HeaderScopeEnum.ROLE_ADMIN.getHeaderValue())
				.post(Entity.entity(jsonSearchDTO, MediaType.APPLICATION_JSON));
		if (response.getStatus() != 200) {
			ErrorResponse error = mapper.readValue(response.readEntity(String.class), ErrorResponse.class);
			throw new RuntimeException("Failed : HTTP error code : " + response.getStatus() + " - "+ error.getMessage());
		}
		return response;
	}

	/**
	 * Search the authority provider for the given authority
	 * 
	 * @param authority
	 * @param searchPhrase
	 * @return
	 * @throws IOException
	 */
	public Response resolveAuthority(String authority, String searchPhrase) throws IOException {
		this.webTarget = this.client.target(baseURI + pathIR).path("authorities/" + authority + "/").queryParam("value", searchPhrase);

		Response response = this.webTarget.request(MediaType.APPLICATION_JSON)
				.header(HeaderScopeEnum.getHeaderTag(), HeaderScopeEnum.ROLE_ADMIN.getHeaderValue()).get();
		if (response.getStatus() != 200) {
			ErrorResponse error = mapper.readValue(response.readEntity(String.class), ErrorResponse.class);
			throw new RuntimeException("Failed : HTTP error code : " + response.getStatus() + " - "+ error.getMessage());
		}
		return response;
	}

	/** 
	 * Search the authority provider for the given authority
	 * 
	 * @param authority
	 * @param searchValue
	 * @return
	 * @throws Exception
	 */
	public List<AuthorityRestDTO> searchAuthority(AuthorityEnum authority, String searchValue) throws Exception {
		List<AuthorityRestDTO> authorities = new ArrayList<AuthorityRestDTO>();
		if (authority!=null) {
			Response response = this.resolveAuthority(authority.getValue(), searchValue);
			String result = response.readEntity(String.class);
			ObjectMapper mapper = new ObjectMapper();
			authorities = Arrays.asList(mapper.readValue(result, AuthorityRestDTO[].class));
			return authorities;
		} else {
			throw new Exception("You have to specify the authority for the AuthorityResolver");
		}
	}
	
	/**
	 * Get ance journal by dto
	 * 
	 * @param searchDTO
	 * @return
	 * @throws IOException
	 */
	public Response journals(AnceSearchRestDTO searchDTO) throws IOException {
		this.webTarget = this.client.target(baseURI + pathIR).path("ance/search");

		ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
		String jsonSearchDTO = ow.writeValueAsString(searchDTO);

		Response response = this.webTarget.request(MediaType.APPLICATION_JSON)
				.header(HeaderScopeEnum.getHeaderTag(), HeaderScopeEnum.ROLE_ADMIN.getHeaderValue())
				.post(Entity.entity(jsonSearchDTO, MediaType.APPLICATION_JSON));
		if (response.getStatus() != 200) {
			ErrorResponse error = mapper.readValue(response.readEntity(String.class), ErrorResponse.class);
			throw new RuntimeException("Failed : HTTP error code : " + response.getStatus() + " - "+ error.getMessage());
		}
		return response;
	}

	/**
	 * Get ance journal by id
	 * 
	 * @param anceId
	 * @return
	 * @throws IOException
	 */
	public Response journal(String anceId) throws IOException {
		this.webTarget = this.client.target(baseURI + pathIR).path("ance/" + anceId);

		Response response = this.webTarget.request(MediaType.APPLICATION_JSON)
				.header(HeaderScopeEnum.getHeaderTag(), HeaderScopeEnum.ROLE_ADMIN.getHeaderValue()).get();
		if (response.getStatus() != 200) {
			ErrorResponse error = mapper.readValue(response.readEntity(String.class), ErrorResponse.class);
			throw new RuntimeException("Failed : HTTP error code : " + response.getStatus() + " - "+ error.getMessage());
		}
		return response;
	}

	/**
	 * Get person by id
	 * 
	 * @param personId
	 * @return
	 * @throws IOException
	 */
	public Response personById(String personId) throws IOException {
		this.webTarget = this.client.target(baseURI + pathRM).path("personsbyid/" + personId);

		Response response = this.webTarget.request(MediaType.APPLICATION_JSON)
				.header(HeaderScopeEnum.getHeaderTag(), HeaderScopeEnum.ROLE_ADMIN.getHeaderValue()).get();
		if (response.getStatus() != 200) {
			ErrorResponse error = mapper.readValue(response.readEntity(String.class), ErrorResponse.class);
			throw new RuntimeException("Failed : HTTP error code : " + response.getStatus() + " - "+ error.getMessage());
		}
		return response;
	}

	/**
	 * Get person by cf
	 * 
	 * @param personId
	 * @return
	 * @throws IOException
	 */
	public Response personByCF(String personId) throws IOException {
		this.webTarget = this.client.target(baseURI + pathRM).path("personsbycf/" + personId);

		Response response = this.webTarget.request(MediaType.APPLICATION_JSON)
				.header(HeaderScopeEnum.getHeaderTag(), HeaderScopeEnum.ROLE_ADMIN.getHeaderValue()).get();
		if (response.getStatus() != 200) {
			ErrorResponse error = mapper.readValue(response.readEntity(String.class), ErrorResponse.class);
			throw new RuntimeException("Failed : HTTP error code : " + response.getStatus() + " - "+ error.getMessage());
		}
		return response;
	}

	/**
	 * Get person by cris id
	 * 
	 * @param crisId
	 * @return
	 * @throws IOException
	 */
	public Response personByCris(String crisId) throws IOException {
		this.webTarget = this.client.target(baseURI + pathRM).path("personsbyrpid/" + crisId);

		Response response = this.webTarget.request(MediaType.APPLICATION_JSON)
				.header(HeaderScopeEnum.getHeaderTag(), HeaderScopeEnum.ROLE_ADMIN.getHeaderValue()).get();
		if (response.getStatus() != 200) {
			ErrorResponse error = mapper.readValue(response.readEntity(String.class), ErrorResponse.class);
			throw new RuntimeException("Failed : HTTP error code : " + response.getStatus() + " - "+ error.getMessage());
		}
		return response;
	}

	/**
	 * Get person position by person id
	 * 
	 * @param personId
	 * @return
	 * @throws IOException
	 */
	public Response positionsById(String personId) throws IOException {
		this.webTarget = this.client.target(baseURI + pathRM).path("personsbyid/" + personId + "/positions");

		Response response = this.webTarget.request(MediaType.APPLICATION_JSON)
				.header(HeaderScopeEnum.getHeaderTag(), HeaderScopeEnum.ROLE_ADMIN.getHeaderValue()).get();
		if (response.getStatus() != 200) {
			ErrorResponse error = mapper.readValue(response.readEntity(String.class), ErrorResponse.class);
			throw new RuntimeException("Failed : HTTP error code : " + response.getStatus() + " - "+ error.getMessage());
		}
		return response;
	}

	/**
	 * Get person position by cris id
	 * 
	 * @param crisId
	 * @return
	 * @throws IOException
	 */
	public Response positionsByCris(String crisId) throws IOException {
		this.webTarget = this.client.target(baseURI + pathRM).path("personsbyrpid/" + crisId + "/positions");

		Response response = this.webTarget.request(MediaType.APPLICATION_JSON)
				.header(HeaderScopeEnum.getHeaderTag(), HeaderScopeEnum.ROLE_ADMIN.getHeaderValue()).get();
		if (response.getStatus() != 200) {
			ErrorResponse error = mapper.readValue(response.readEntity(String.class), ErrorResponse.class);
			throw new RuntimeException("Failed : HTTP error code : " + response.getStatus() + " - "+ error.getMessage());
		}
		return response;
	}

	/**
	 * Get current person position by person id
	 * 
	 * @param personId
	 * @return
	 * @throws IOException
	 */
	public Response positioncurrentById(String personId) throws IOException {
		this.webTarget = this.client.target(baseURI + pathRM).path("personsbyid/" + personId + "/positioncurrent");

		Response response = this.webTarget.request(MediaType.APPLICATION_JSON)
				.header(HeaderScopeEnum.getHeaderTag(), HeaderScopeEnum.ROLE_ADMIN.getHeaderValue()).get();
		if (response.getStatus() != 200) {
			ErrorResponse error = mapper.readValue(response.readEntity(String.class), ErrorResponse.class);
			throw new RuntimeException("Failed : HTTP error code : " + response.getStatus() + " - "+ error.getMessage());
		}
		return response;
	}

	/**
	 * Get current person position by cris id
	 * 
	 * @param crisId
	 * @return
	 * @throws IOException
	 */
	public Response positioncurrentByCris(String crisId) throws IOException {
		this.webTarget = this.client.target(baseURI + pathRM).path("personsbyrpid/" + crisId + "/positioncurrent");

		Response response = this.webTarget.request(MediaType.APPLICATION_JSON)
				.header(HeaderScopeEnum.getHeaderTag(), HeaderScopeEnum.ROLE_ADMIN.getHeaderValue()).get();
		if (response.getStatus() != 200) {
			ErrorResponse error = mapper.readValue(response.readEntity(String.class), ErrorResponse.class);
			throw new RuntimeException("Failed : HTTP error code : " + response.getStatus() + " - "+ error.getMessage());
		}
		return response;
	}

	public Response people(String cf) throws IOException {
		this.webTarget = this.client.target(baseURI + pathIR).path("people/" + cf);

		Response response = this.webTarget.request(MediaType.APPLICATION_JSON)
				.header(HeaderScopeEnum.getHeaderTag(), HeaderScopeEnum.ROLE_ADMIN.getHeaderValue()).get();
		if (response.getStatus() != 200) {
			ErrorResponse error = mapper.readValue(response.readEntity(String.class), ErrorResponse.class);
			throw new RuntimeException("Failed : HTTP error code : " + response.getStatus() + " - "+ error.getMessage());
		}
		return response;
	}
	
	/**
	 * Get person by id (person or cris)
	 * 
	 * @param id
	 * @return
	 * @throws IOException
	 */
	public Response person(String id) throws IOException {
		this.webTarget = this.client.target(baseURI + pathRM).path("persons/" + id);

		Response response = this.webTarget.request(MediaType.APPLICATION_JSON)
				.header(HeaderScopeEnum.getHeaderTag(), HeaderScopeEnum.ROLE_ADMIN.getHeaderValue()).get();
		if (response.getStatus() != 200) {
			ErrorResponse error = mapper.readValue(response.readEntity(String.class), ErrorResponse.class);
			throw new RuntimeException("Failed : HTTP error code : " + response.getStatus() + " - "+ error.getMessage());
		}
		return response;
	}

	/**
	 * Get person position by id (person or cris)
	 * 
	 * @param id
	 * @return
	 * @throws IOException
	 */
	public Response positions(String id) throws IOException {
		this.webTarget = this.client.target(baseURI + pathRM).path("persons/" + id + "/positions");

		Response response = this.webTarget.request(MediaType.APPLICATION_JSON)
				.header(HeaderScopeEnum.getHeaderTag(), HeaderScopeEnum.ROLE_ADMIN.getHeaderValue()).get();
		if (response.getStatus() != 200) {
			ErrorResponse error = mapper.readValue(response.readEntity(String.class), ErrorResponse.class);
			throw new RuntimeException("Failed : HTTP error code : " + response.getStatus() + " - "+ error.getMessage());
		}
		return response;
	}

	/**
	 * Get current person position by id (person or cris)
	 * 
	 * @param id
	 * @return
	 * @throws IOException
	 */
	public Response positioncurrent(String id) throws IOException {
		this.webTarget = this.client.target(baseURI + pathRM).path("persons/" + id + "/positioncurrent");

		Response response = this.webTarget.request(MediaType.APPLICATION_JSON)
				.header(HeaderScopeEnum.getHeaderTag(), HeaderScopeEnum.ROLE_ADMIN.getHeaderValue()).get();
		if (response.getStatus() != 200) {
			ErrorResponse error = mapper.readValue(response.readEntity(String.class), ErrorResponse.class);
			throw new RuntimeException("Failed : HTTP error code : " + response.getStatus() + " - "+ error.getMessage());
		}
		return response;
	}
	
	/**
	 * Upload attachment with licence metadata for item
	 * 
	 * @param itemId
	 * @param optionBitStreamDTO
	 * @param fileName
	 * @return
	 * @throws IOException
	 */
	@SuppressWarnings("resource")
	public Response uploadStream(Integer itemId, BitstreamOptionsDTO bitstreamOptionsDTO, String fileName)
			throws IOException {
		WebTarget webTarget = client.target(baseURI + pathIR).path("streams/items/" + itemId);

		// Compose multipart request (multipart/form-data)
		// See
		// http://stackoverflow.com/questions/27609569/file-upload-along-with-other-object-in-jersey-restful-web-service/27614403#27614403
		// See https://jersey.java.net/documentation/latest/media.html#multipart

		MultiPart multipartEntity = null;
		try {
			FileDataBodyPart fileDataBodyPart = new FileDataBodyPart("file", new File(fileName),
					MediaType.APPLICATION_OCTET_STREAM_TYPE);
			fileDataBodyPart.setContentDisposition(FormDataContentDisposition.name("file").fileName(fileName).build());

			ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
			String jsonBitstreamOptionsDTO = ow.writeValueAsString(bitstreamOptionsDTO);

			multipartEntity = new FormDataMultiPart()
					.field("bitstreamOptionsDTO", jsonBitstreamOptionsDTO, MediaType.APPLICATION_JSON_TYPE)
					.bodyPart(fileDataBodyPart);

			Response response = webTarget.request(MediaType.APPLICATION_JSON)
					.header(HeaderScopeEnum.getHeaderTag(), HeaderScopeEnum.ROLE_ADMIN.getHeaderValue())
					.post(Entity.entity(multipartEntity, MediaType.MULTIPART_FORM_DATA_TYPE));

			if (response.getStatus() != 201) {
				ErrorResponse error = mapper.readValue(response.readEntity(String.class), ErrorResponse.class);
				throw new RuntimeException("Failed : HTTP error code : " + response.getStatus() + " - "+ error.getMessage());
			}

			response.getHeaderString("location");

			return response;
		} finally {
			if (multipartEntity != null) {
				multipartEntity.close();
			}
		}
	}

	/**
	 * Upload attachment with licence metadata for item
	 * 
	 * @param itemId
	 * @param bitstreamOptionsDTO
	 * @param inputstream
	 * @param fileName
	 * @param headers
	 * @return
	 * @throws IOException
	 */
	public Response uploadStream(Integer itemId, BitstreamOptionsDTO bitstreamOptionsDTO, InputStream inputstream,
			String attachFileName) throws IOException {
		return uploadStream(itemId, bitstreamOptionsDTO, inputstream, attachFileName, null);
	}

	/**
	 * Upload attachment with licence metadata for item
	 * 
	 * @param itemId
	 * @param bitstreamOptionsDTO
	 * @param inputstream
	 * @param fileName
	 * @param headers
	 * @return
	 * @throws IOException
	 */
	@SuppressWarnings("resource")
	public Response uploadStream(Integer itemId, BitstreamOptionsDTO bitstreamOptionsDTO, InputStream inputstream,
			String attachFileName, MultivaluedMap<String, Object> headers) throws IOException {
		WebTarget webTarget = client.target(baseURI + pathIR).path("streams/items/" + itemId);

		// Compose multipart request (multipart/form-data)
		// See
		// http://stackoverflow.com/questions/27609569/file-upload-along-with-other-object-in-jersey-restful-web-service/27614403#27614403
		// See https://jersey.java.net/documentation/latest/media.html#multipart

		MultiPart multipartEntity = null;
		try {
			StreamDataBodyPart fileDataBodyPart = new StreamDataBodyPart("file", inputstream);

			fileDataBodyPart
					.setContentDisposition(FormDataContentDisposition.name("file").fileName(attachFileName).build());

			ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
			String jsonBitstreamOptionsDTO = ow.writeValueAsString(bitstreamOptionsDTO);

			multipartEntity = new FormDataMultiPart()
					.field("bitstreamOptionsDTO", jsonBitstreamOptionsDTO, MediaType.APPLICATION_JSON_TYPE)
					.bodyPart(fileDataBodyPart);

			if (headers == null) {
				headers = new MultivaluedHashMap<String, Object>();
				if (!headers.containsKey(HeaderScopeEnum.getHeaderTag())) {
					headers.add(HeaderScopeEnum.getHeaderTag(), HeaderScopeEnum.ROLE_ADMIN.getHeaderValue());
				}
			}

			Response response = webTarget.request(MediaType.APPLICATION_JSON).headers(headers)
					.post(Entity.entity(multipartEntity, MediaType.MULTIPART_FORM_DATA_TYPE));

			if (response.getStatus() != 201) {
				ErrorResponse error = mapper.readValue(response.readEntity(String.class), ErrorResponse.class);
				throw new RuntimeException("Failed : HTTP error code : " + response.getStatus() + " - "+ error.getMessage());
			}

			response.getHeaderString("location");

			return response;
		} finally {
			if (multipartEntity != null) {
				multipartEntity.close();
			}
		}
	}

	/**
	 * Upload attachment with licence metadata for item
	 * 
	 * @param itemId
	 * @param optionBitStreamDTO
	 * @param fileName
	 * @return
	 * @throws IOException
	 */
	public Response uploadStream(String handle, BitstreamOptionsDTO bitstreamOptionsDTO, InputStream inputstream,
			String attachFileName) throws IOException {
		return uploadStream(handle, bitstreamOptionsDTO, inputstream, attachFileName, null);
	}

	/**
	 * Upload attachment with licence metadata for item
	 * 
	 * @param itemId
	 * @param optionBitStreamDTO
	 * @param fileName
	 * @param headers
	 * @return
	 * @throws IOException
	 */
	@SuppressWarnings("resource")
	public Response uploadStream(String handle, BitstreamOptionsDTO bitstreamOptionsDTO, InputStream inputstream,
			String attachFileName, MultivaluedMap<String, Object> headers) throws IOException {
		WebTarget webTarget = client.target(baseURI + pathIR).path("streams/items/" + handle);

		// Compose multipart request (multipart/form-data)
		// See
		// http://stackoverflow.com/questions/27609569/file-upload-along-with-other-object-in-jersey-restful-web-service/27614403#27614403
		// See https://jersey.java.net/documentation/latest/media.html#multipart

		MultiPart multipartEntity = null;
		try {
			StreamDataBodyPart fileDataBodyPart = new StreamDataBodyPart("file", inputstream);

			fileDataBodyPart
					.setContentDisposition(FormDataContentDisposition.name("file").fileName(attachFileName).build());

			ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
			String jsonBitstreamOptionsDTO = ow.writeValueAsString(bitstreamOptionsDTO);

			multipartEntity = new FormDataMultiPart()
					.field("bitstreamOptionsDTO", jsonBitstreamOptionsDTO, MediaType.APPLICATION_JSON_TYPE)
					.bodyPart(fileDataBodyPart);

			if (headers == null) {
				headers = new MultivaluedHashMap<String, Object>();
				if (!headers.containsKey(HeaderScopeEnum.getHeaderTag())) {
					headers.add(HeaderScopeEnum.getHeaderTag(), HeaderScopeEnum.ROLE_ADMIN.getHeaderValue());
				}
			}

			Response response = webTarget.request(MediaType.APPLICATION_JSON).headers(headers)
					.post(Entity.entity(multipartEntity, MediaType.MULTIPART_FORM_DATA_TYPE));

			if (response.getStatus() != 201) {
				ErrorResponse error = mapper.readValue(response.readEntity(String.class), ErrorResponse.class);
				throw new RuntimeException("Failed : HTTP error code : " + response.getStatus() + " - "+ error.getMessage());
			}

			return response;
		} finally {
			if (multipartEntity != null) {
				multipartEntity.close();
			}
		}
	}

	/**
	 * Close client connection
	 */
	public void close() {
		this.client.close();
	}
}