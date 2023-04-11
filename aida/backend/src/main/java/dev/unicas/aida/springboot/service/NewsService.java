package dev.unicas.aida.springboot.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.unicas.aida.springboot.model.News;
import dev.unicas.aida.springboot.model.NewsLang;
import dev.unicas.aida.springboot.repository.NewsLangRepository;
import dev.unicas.aida.springboot.repository.NewsRepository;

@Service
public class NewsService {

	@Autowired
	public NewsRepository repository;

	@Autowired
	public NewsLangRepository langRepository;
	
	public News save(News n) {
		this.repository.save(n);
		saveLanguages(n);
		return n;
	}

	public News edit(News res, Integer id) throws Exception {
		Optional<News> news = findById(id);
		if (news.isPresent()) {
			this.delete(id);
			res.setCreationDate(new Date());
			this.repository.save(res);
			saveLanguages(res);
			return res;
		} else {
			throw new Exception("Not found");
		}
	}

	private void saveLanguages(News news) {
		for (NewsLang lang : news.getLangs()) {
			lang.setNews(news);
			this.langRepository.save(lang);
		}
	}

	private void deleteLanguages(News news) {
		for (NewsLang lang : news.getLangs()) {
			this.langRepository.delete(lang);
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
		Optional<News> entity = this.repository.findById(id);
		this.deleteLanguages(entity.get());
		this.repository.deleteById(id);
		return true;
	}
}
