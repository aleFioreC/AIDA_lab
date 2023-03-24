package dev.unicas.aida.springboot.model.iris;

import java.math.BigDecimal;
import java.util.List;

public class IRISPeople {

	private String uid;

	private BigDecimal id;

	private String discriminator;

	private String displayValue;

	private String lastModified;

	private IRISGender gender;

	private String cf;

	private List<IRISContact> contactSet;

	private String idAb;

	private String pid;

	private String lastName;

	private String firstName;

	private String birthDate;

	public IRISPeople() {
	}

	public IRISPeople(String uid, BigDecimal id, String discriminator, String displayValue, String lastModified,
			IRISGender gender, String cf, List<IRISContact> contactSet, String idAb, String pid, String lastName,
			String firstName, String birthDate) {
		super();
		this.uid = uid;
		this.id = id;
		this.discriminator = discriminator;
		this.displayValue = displayValue;
		this.lastModified = lastModified;
		this.gender = gender;
		this.cf = cf;
		this.contactSet = contactSet;
		this.idAb = idAb;
		this.pid = pid;
		this.lastName = lastName;
		this.firstName = firstName;
		this.birthDate = birthDate;
	}

	public String getUid() {
		return uid;
	}

	public void setUid(String uid) {
		this.uid = uid;
	}

	public BigDecimal getId() {
		return id;
	}

	public void setId(BigDecimal id) {
		this.id = id;
	}

	public String getDiscriminator() {
		return discriminator;
	}

	public void setDiscriminator(String discriminator) {
		this.discriminator = discriminator;
	}

	public String getDisplayValue() {
		return displayValue;
	}

	public void setDisplayValue(String displayValue) {
		this.displayValue = displayValue;
	}

	public String getLastModified() {
		return lastModified;
	}

	public void setLastModified(String lastModified) {
		this.lastModified = lastModified;
	}

	public IRISGender getGender() {
		return gender;
	}

	public void setGender(IRISGender gender) {
		this.gender = gender;
	}

	public String getCf() {
		return cf;
	}

	public void setCf(String cf) {
		this.cf = cf;
	}

	public List<IRISContact> getContactSet() {
		return contactSet;
	}

	public void setContactSet(List<IRISContact> contactSet) {
		this.contactSet = contactSet;
	}

	public String getIdAb() {
		return idAb;
	}

	public void setIdAb(String idAb) {
		this.idAb = idAb;
	}

	public String getPid() {
		return pid;
	}

	public void setPid(String pid) {
		this.pid = pid;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(String birthDate) {
		this.birthDate = birthDate;
	}

	@Override
	public String toString() {
		return "IRISPeople [uid=" + uid + ", id=" + id + ", discriminator=" + discriminator + ", displayValue="
				+ displayValue + ", lastModified=" + lastModified + ", gender=" + gender + ", cf=" + cf
				+ ", contactSet=" + contactSet + ", idAb=" + idAb + ", pid=" + pid + ", lastName=" + lastName
				+ ", firstName=" + firstName + ", birthDate=" + birthDate + "]";
	}

}