package br.org.senai.usecase.cliente;

import java.time.LocalDate;
import java.time.Month;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/cliente")
public class ClienteRestFacade {

	private static final Set<Cliente> LISTA_CLIENTES = new HashSet<>();
	private static Long PROXIMO_ID_CLIENTE = 1L;

	static {
		Cliente cliente = new Cliente();
		cliente.setId(PROXIMO_ID_CLIENTE++);
		cliente.setNome("Fulano de tal");
		// cliente.setDataNascimento(new Date());
		cliente.setDataNascimento(LocalDate.of(1987, Month.AUGUST, 22));
		cliente.setCpf("023.534.235-93");
		LISTA_CLIENTES.add(cliente);

		cliente = new Cliente();
		cliente.setId(PROXIMO_ID_CLIENTE++);
		cliente.setNome("Ciclano");
		// cliente.setDataNascimento(new Date(82, 5, 13));
		cliente.setDataNascimento(LocalDate.of(1982, Month.JUNE, 13));
		cliente.setCpf("024.554.265-06");
		LISTA_CLIENTES.add(cliente);
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Set<Cliente> listarTodos() {
		return LISTA_CLIENTES;
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public void salvar(Cliente cliente) {
		if (cliente.getId() != null) {
			LISTA_CLIENTES.remove(cliente);
		} else {
			cliente.setId(PROXIMO_ID_CLIENTE++);
		}
		
		LISTA_CLIENTES.add(cliente);
	}

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Cliente consultar(@PathParam("id") Long id) {
		Iterator<Cliente> iteratorListaClientes = LISTA_CLIENTES.iterator();

		while (iteratorListaClientes.hasNext()) {
			Cliente cliente = iteratorListaClientes.next();

			if (cliente.getId().equals(id)) {
				return cliente;
			}
		}

		return null;
	}

	@DELETE
	@Path("/{id}")
	public void excluir(@PathParam("id") Long id) {
		Iterator<Cliente> iteratorListaClientes = LISTA_CLIENTES.iterator();

		while (iteratorListaClientes.hasNext()) {
			Cliente cliente = iteratorListaClientes.next();

			if (cliente.getId().equals(id)) {
				LISTA_CLIENTES.remove(cliente);
				break;
			}
		}
	}
}
