package cineca.iris.ir.rest.model.utils;

import java.util.List;
import java.util.Map;

import cineca.iris.ir.rest.model.MetadataEntryRestDTO;

public interface IInputformType {
	
	public Map<String, List<MetadataEntryRestDTO>> build(String schema, String element, String qualifier, String value, String authority);

}
