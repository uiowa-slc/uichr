<% if $MoreThanOnePage %>
<div id="PageNumbers">
	<ul class="pagination">
		<% if $NotFirstPage %>
			<li class="arrow">
				<a href="{$PrevLink}" title="View the previous page">&laquo; Previous</a>
			</li>
		<% end_if %>

		<% loop $PaginationSummary(4) %>
			<% if $CurrentBool %>
				<li class="current"><a class="disabled">$PageNum</a></li>
			<% else %>
				<% if $Link %>
					<li>
						<a class="" href="$Link">
						$PageNum
						</a>
					</li>
				<% else %>
					<li class="disabled"><a class="disabled">&hellip;</a></li>
				<% end_if %>
			<% end_if %>
		<% end_loop %>

		<% if $NotLastPage %>
			<li class="arrow">
				<a href="{$NextLink}" title="View the next page">Next &raquo;</a>
			</li>
		<% end_if %>
	</ul>
</div>
<% end_if %>