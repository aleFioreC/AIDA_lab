/*
 *  Java Iris Rest Client, pratical example for use IRIS REST API
 * 
 *  Copyright (c) 2015, CINECA and third-party contributors as
 *  indicated by the @author tags or express copyright attribution
 *  statements applied by the authors.  All third-party contributions are
 *  distributed under license by CINECA.
 * 
 *  This copyrighted material is made available to anyone wishing to use, modify,
 *  copy, or redistribute it subject to the terms and conditions of the GNU
 *  Lesser General Public License v3 or any later version, as published 
 *  by the Free Software Foundation, Inc. <http://fsf.org/>.
 * 
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 *  or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public License
 *  for more details.
 * 
 *  You should have received a copy of the GNU Lesser General Public License
 *  along with this distribution; if not, write to:
 *  Free Software Foundation, Inc.
 *  51 Franklin Street, Fifth Floor
 *  Boston, MA  02110-1301  USA
 */
package cineca.iris.ir.rest.search.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * 
 * @author pmeriggi
 *
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class AnceSearchRestDTO {

    private String anceId;
    private String crisId;

    public String getAnceId() {
        return anceId;
    }

    public void setAnceId(String anceId) {
        this.anceId = anceId;
    }

    public String getCrisId() {
        return crisId;
    }

    public void setCrisId(String crisId) {
        this.crisId = crisId;
    }

    public AnceSearchRestDTO() {
        super();
    }

    public AnceSearchRestDTO(String crisId, String anceId) {
        super();
        this.crisId = crisId;
        this.anceId = anceId;
    }
}
