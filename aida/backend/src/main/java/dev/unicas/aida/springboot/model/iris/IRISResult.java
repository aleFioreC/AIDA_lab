package dev.unicas.aida.springboot.model.iris;

import java.util.List;

public class IRISResult {

	private List<IRISPublication> resultList;

	public IRISResult() {
	}

	public IRISResult(List<IRISPublication> resultList) {
		super();
		this.resultList = resultList;
	}

	public List<IRISPublication> getResultList() {
		return resultList;
	}

	public void setResultList(List<IRISPublication> resultList) {
		this.resultList = resultList;
	}

}