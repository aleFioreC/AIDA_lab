package dev.unicas.aida.springboot.model.dto;

public class UserDto {

	private String name;

	private String surname;

	public UserDto() {
	}

	public UserDto(String name, String surname) {
		super();
		this.name = name;
		this.surname = surname;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

}