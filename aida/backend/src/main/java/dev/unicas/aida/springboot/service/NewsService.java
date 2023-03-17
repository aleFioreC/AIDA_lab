package dev.unicas.aida.springboot.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.unicas.aida.springboot.model.News;
import dev.unicas.aida.springboot.repository.NewsRepository;

@Service
public class NewsService {

	@Autowired
	public NewsRepository repository;

	public News save(News n) {
		this.repository.save(n);
		return n;
	}

	public News edit(News n, Integer id) throws Exception {
		Optional<News> news = findById(id);
		if (news.isPresent()) {
			News p = news.get();
			p.setTitle(n.getTitle());
			p.setDescription(n.getDescription());
			p.setFile(n.getFile());
			return this.repository.save(p);
		} else {
			throw new Exception("Not found");
		}
	}

	public List<News> findAll() {
		return (List<News>) this.repository.findAllByOrderByCreationDateDesc();
	}

	public News findTopNews() {
		List<News> news = this.repository.findAllByOrderByCreationDateDesc();
		if (!news.isEmpty() && news.get(0) != null)
			return news.get(0);
		return null;
	}

	public Optional<News> findById(Integer id) {
		return this.repository.findById(id);
	}

	public boolean delete(Integer id) {
		this.repository.deleteById(id);
		;
		return true;
	}
}
