package dev.unicas.aida.springboot.model.iris;

public class IRISJournal {

	private String pid;

	private String issn;

	private String title;

	public IRISJournal() {
	}

	public IRISJournal(String pid, String issn, String title) {
		super();
		this.pid = pid;
		this.issn = issn;
		this.title = title;
	}

	public String getPid() {
		return pid;
	}

	public void setPid(String pid) {
		this.pid = pid;
	}

	public String getIssn() {
		return issn;
	}

	public void setIssn(String issn) {
		this.issn = issn;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

}