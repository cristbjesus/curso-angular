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

	private static Set<Cliente> listaClientes = new HashSet<>();

	static {
		Cliente cliente = new Cliente();
		cliente.setId(1L);
		cliente.setNome("Fulano");
		// cliente.setDataNascimento(new Date());
		cliente.setDataNascimento(LocalDate.of(1987, Month.AUGUST, 22));
		cliente.setCpf("023.534.235-93");
		listaClientes.add(cliente);

		cliente = new Cliente();
		cliente.setId(2L);
		cliente.setNome("Ciclano");
		// cliente.setDataNascimento(new Date(82, 5, 13));
		cliente.setDataNascimento(LocalDate.of(1982, Month.JUNE, 13));
		cliente.setCpf("024.554.265-06");
		listaClientes.add(cliente);
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Set<Cliente> listarTodos() {
		return listaClientes;
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public void salvar(Cliente cliente) {
		listaClientes.remove(cliente);
		listaClientes.add(cliente);
	}

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Cliente consultar(@PathParam("id") Long id) {
		Iterator<Cliente> iteratorListaClientes = listaClientes.iterator();

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
		Iterator<Cliente> iteratorListaClientes = listaClientes.iterator();

		while (iteratorListaClientes.hasNext()) {
			Cliente cliente = iteratorListaClientes.next();

			if (cliente.getId().equals(id)) {
				listaClientes.remove(cliente);
				break;
			}
		}
	}
}
