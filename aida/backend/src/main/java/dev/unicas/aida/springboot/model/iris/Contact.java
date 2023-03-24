package dev.unicas.aida.springboot.model.iris;

public class Contact {

	private boolean principal;

	private String description;

	private String type;

	public Contact() {
	}

	public Contact(boolean principal, String description, String type) {
		super();
		this.principal = principal;
		this.description = description;
		this.type = type;
	}

	public boolean isPrincipal() {
		return principal;
	}

	public void setPrincipal(boolean principal) {
		this.principal = principal;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

}