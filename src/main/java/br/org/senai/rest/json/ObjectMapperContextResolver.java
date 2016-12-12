package br.org.senai.rest.json;

import javax.ws.rs.ext.ContextResolver;
import javax.ws.rs.ext.Provider;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

@Provider
public class ObjectMapperContextResolver implements ContextResolver<ObjectMapper> {

	private final ObjectMapper OBJECT_MAPPER;

	public ObjectMapperContextResolver() {
		OBJECT_MAPPER = new ObjectMapper();
		OBJECT_MAPPER.registerModule(new JavaTimeModule());
		OBJECT_MAPPER.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
		// OBJECT_MAPPER.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS,
		// false);

		// JavaTimeModule javaTimeModule = new JavaTimeModule();
		// javaTimeModule.addDeserializer(LocalDate.class, new
		// LocalDateDeserializer());
		// javaTimeModule.addSerializer(LocalDate.class, new
		// LocalDateSerializer());
		//
		// OBJECT_MAPPER.registerModule(javaTimeModule);
	}

	@Override
	public ObjectMapper getContext(Class<?> arg0) {
		return OBJECT_MAPPER;
	}
}
