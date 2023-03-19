package dev.unicas.aida.springboot.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

@Entity
public class People {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idPeople;

	private String name;

	private String surname;

	private String email;

	private String number;

	private String additionalInfo;

	private String role;

	private String roleGroup;

	@Lob
	private String file;

	public People() {
	}

	public People(String name, String surname, String email, String number, String additionalInfo, String role,
			String roleGroup, String file) {
		super();
		this.name = name;
		this.surname = surname;
		this.email = email;
		this.number = number;
		this.additionalInfo = additionalInfo;
		this.role = role;
		this.roleGroup = roleGroup;
		this.file = file;
	}

	public Integer getIdPeople() {
		return idPeople;
	}

	public void setIdPeople(Integer idPeople) {
		this.idPeople = idPeople;
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

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public String getAdditionalInfo() {
		return additionalInfo;
	}

	public void setAdditionalInfo(String additionalInfo) {
		this.additionalInfo = additionalInfo;
	}

	public String getFile() {
		return file;
	}

	public void setFile(String file) {
		this.file = file;
	}

	public String getRoleGroup() {
		return roleGroup;
	}

	public void setRoleGroup(String roleGroup) {
		this.roleGroup = roleGroup;
	}

}