<%--
  Created by IntelliJ IDEA.
  User: mario
  Date: 06/05/17
  Time: 6.41
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Program List</title>
</head>
<body>

    <table width="75%" border="1" align="center">

        <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Help</th>
        </tr>
        <s:iterator value="programs" status="itStatus">
            <tr>
                <td> <s:property value="name"/> </td>
                <td> <s:property value="code"/> </td>
                <td> <s:property value="help"/> </td>
            </tr>
        </s:iterator>
    </table>


</body>
</html>
