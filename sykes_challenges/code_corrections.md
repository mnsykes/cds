Example 1:

```html
<form id="Form1" name="Form1" action="regInfo_p.asp" method="post" class="form-horizontal">
	<input type="hidden" name="sc" id="sc" value="<%=sc%>" />
</form>
```

Example 2:

```javascript
$("#HandicapBtn").on("click", function (evt) {
	if ($(this).prop("checked")) {
		$("[id^=Row_HandicapText]").show();
		$("#HandicapText").addClass("required");
	} else {
		$("[id^=Row_HandicapText]").hide();
		$("#HandicapText").val("").removeClass("required");
	}
});
```

Example 3:

```sql
SELECT
  [name] AS namefield,
  [longname] AS labelfield,
  state_id,
  region_id
FROM TAB_SS_StateDefinitions
WHERE
  (@Country = ''
  OR Country = @Country)
  AND name <> XX
ORDER BY labelfield;
```

Example 4:

```sql
SELECT
  firstname,
  lastname,
  optin,
  email
FROM TAB_Reg
WHERE optin = 1
ORDER BY lastname;
```
