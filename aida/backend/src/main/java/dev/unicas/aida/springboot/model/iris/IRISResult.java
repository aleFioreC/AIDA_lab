package dev.unicas.aida.springboot.model.iris;

import java.util.List;

public class IRISResult {

	private List<Publication> resultList;

	public IRISResult() {
	}

	public IRISResult(List<Publication> resultList) {
		super();
		this.resultList = resultList;
	}

	public List<Publication> getResultList() {
		return resultList;
	}

	public void setResultList(List<Publication> resultList) {
		this.resultList = resultList;
	}

}