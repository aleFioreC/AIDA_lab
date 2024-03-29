package cineca.iris.ir.rest.model.utils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import cineca.iris.ir.rest.model.MetadataEntryRestDTO;

public class GeneralType extends AbstractInputformType {

	@Override
	public Map<String, List<MetadataEntryRestDTO>> build(String schema, String element, String qualifier, String value, String authority) {
		Map<String, List<MetadataEntryRestDTO>> result = new HashMap<String, List<MetadataEntryRestDTO>>();
		
		MetadataEntryRestDTO entry = new MetadataEntryRestDTO();
		entry.setAuthority(authority);
		entry.setValue(value);
		
		result.put(KeyUtils.makeFieldKey(schema, element, qualifier), new ArrayList<MetadataEntryRestDTO>(Arrays.asList(entry)));
		
		return result;
	}
}
