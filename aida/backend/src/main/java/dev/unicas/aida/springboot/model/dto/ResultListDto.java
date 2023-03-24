package dev.unicas.aida.springboot.model.dto;

import java.util.List;

import dev.unicas.aida.springboot.model.iris.Publication;

public class ResultListDto {

	private List<Publication> resultList;

	public ResultListDto() {
	}

	public ResultListDto(List<Publication> resultList) {
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