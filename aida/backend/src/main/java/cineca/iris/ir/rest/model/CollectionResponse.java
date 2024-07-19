package cineca.iris.ir.rest.model;

import java.util.List;

public class CollectionResponse {

	private String next;
	private String prev;
	private List<CollectionRes> restResourseDTOList;

	public String getNext() {
		return next;
	}

	public void setNext(String next) {
		this.next = next;
	}

	public String getPrev() {
		return prev;
	}

	public void setPrev(String prev) {
		this.prev = prev;
	}

	public List<CollectionRes> getRestResourseDTOList() {
		return restResourseDTOList;
	}

	public void setRestResourseDTOList(List<CollectionRes> restResourseDTOList) {
		this.restResourseDTOList = restResourseDTOList;
	}

}
